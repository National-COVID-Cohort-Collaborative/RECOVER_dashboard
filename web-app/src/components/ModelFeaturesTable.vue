
<template>
  <div class="p-2">
        <div class="flex justify-center w-full">
            <div class="text-center p-1">
                <small class="m-0 block"><i class="fas fa-info-circle text-blue-400"></i> How to read these plots</small>
                <svg version="1.1" width="150" id="Layer_1" x="0px" y="0px"
                    viewBox="0 0 42.7 10.4" style="enable-background:new 0 0 42.7 10.4;" xml:space="preserve">
                <rect 
                data-toggle="tooltip" 
                data-tippy-placement="top" 
                data-tippy-content="Odd Ratio" 
                id="odds" x="21" y="0" class="fill-gray-400 hover:fill-rose-400" width="0.7" height="10.4"/>
                <g id="left" data-toggle="tooltip" 
                data-tippy-placement="bottom" 
                data-tippy-content="Decreased risk of condition">
                    <rect class="fill-gray-100 dark:fill-gray-500" width="21" height="10.4"/>
                    <rect x="5.8" y="5.2"
                    data-toggle="tooltip" 
                    data-tippy-placement="top" 
                    data-tippy-content="95% confidence interval" class="fill-gray-400 hover:fill-rose-400" width="9.7" height="0.5"/>
                    <circle class="fill-gray-400 hover:fill-rose-400" data-toggle="tooltip" 
                    data-tippy-placement="top" 
                    data-tippy-content="Estimated risk factor" cx="10" cy="5.4" r="1.5"/>
                </g>
                <g id="right" data-toggle="tooltip" 
                data-tippy-placement="bottom" 
                data-tippy-content="Increased risk of condition">
                    <rect x="21.6" class="fill-gray-100 dark:fill-gray-500" width="21" height="10.4"/>
                    <rect x="27.1" y="4.9" class="fill-gray-400 hover:fill-rose-400" data-toggle="tooltip" 
                    data-tippy-placement="top" 
                    data-tippy-content="95% confidence interval" width="9.7" height="0.5"/>
                    <circle class="fill-gray-400 hover:fill-rose-400" data-toggle="tooltip" 
                    data-tippy-placement="top" 
                    data-tippy-content="Estimated risk factor" cx="34.2" cy="5.2" r="1.5"/>
                </g>
                </svg>
            </div>
        </div>
        <div class="flex justify-center w-full">
          <div id="fig4"></div>
        </div>
    </div>
</template>

<script>
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import axios from 'axios'
import tippy from 'tippy.js';

export default {
  setup() {

    var d3_hor_bar = function(cell, formatterParams, onRendered){
        let v = cell.getValue()
        let max = formatterParams.max
        let percentage = (v * 100) / max;
        // console.log(`${v} of ${max} = ${percentage}`)
        if (cell.getValue() !== "*") {
            var width = 100;
            var height = 20;

            var svg = d3.create('svg');
            //Create SVG element
            svg.attr("width", width)
            .attr("height", height)

            //percentage bar
            svg.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", percentage)
                .attr("height", height)
                .attr('class', formatterParams.color)
                .attr('data-toggle', "tooltip")
                .attr('data-tippy-placement',"top")
                .attr('data-tippy-content', cell.getValue())

            return svg.node()
        } else {
            return "<p class='text-center m-0'><i data-toggle='tooltip' data-tippy-content='data not in top 20'>~</i></p>"
        }
    }

    var d3_dot = function(cell, formatterParams, onRendered){
        let v = cell.getValue()
        // console.log(`${v} values`)
        if (!v.includes('see discussion')) {
            var width = 150;
            var height = 20;

            var svg = d3.create('svg');
            //Create SVG element
            svg.attr("width", width)
            .attr("height", height)

            if (v.length) {
                
                // Create scale
                var x = d3.scaleLinear()
                    .domain([-v[3], v[3]])
                    .range([ 0, width]);

                var y = d3.scaleLinear()
                    .domain([-3, 3])
                    .range([ 0, height]);

                svg.append("line")
                .attr("x1", x(0))
                .attr("y1", y(-4))
                .attr("x2", x(0))
                .attr("y2", y(4))
                .style("stroke-dasharray","2,2")
                .attr("class", formatterParams.stroke)

                svg.append("g")
                    .attr("transform", "translate(0," + height/2 + ")")
                    .call(d3.axisBottom(x).ticks(0))

                svg.append("line")
                    .attr("x1", function(d) { return x(v[1]); })
                    .attr("x2", function(d) { return x(v[2]); })
                    .attr("y1", height/2)
                    .attr("y2", height/2)
                    .attr("class", "stroke-gray-300 dark:stroke-white")
                    .attr("stroke-width", "3px")

                svg.append("circle")
                    .attr("cx", function(d) { return x(v[0]) })
                    .attr("cy", function(d) { return height; })
                    .attr("cy", height/2)
                    .attr("r", 4)
                    .attr('class', formatterParams.color)
                    .attr('data-toggle', "tooltip")
                    .attr('data-tippy-placement',"top")
                    .attr('data-tippy-content', `${v[0]} (${v[1]} - ${v[2]})`)
                //hide domain x-axis
                d3.selectAll("path.domain")
                    .style("stroke","transparent");
            }
            return svg.node()
        } else {
            return "<p style='color:" + formatterParams.textColor + "' class='text-center m-0'><small><i>see discussion</i></small></p>"
        }
    }

    let tableData = []
    let hospMax, nonHospMax, allMax;

    function draw(){
        new Tabulator("#fig4", {
        // height:"500px",
        debugInvalidOptions:false, 
        data:tableData,
        layout:"fitDataTable",
        selectable:true, //make rows selectable
        movableColumns:false,
        resizableRows:false,
        initialSort:[ 
            //set the initial sort order of the data
            {column:"nonhosp_importance", dir:"desc"},
        ],
        columns:[ 
            {
                title:"Feature", 
                cssClass:"dark:!bg-slate-800 dark:text-white px-4",
                field:"feature", 
                // frozen:true,
                formatter: function(cell){
                    cell.getElement().style.fontWeight = 'bold';
                    return cell.getValue()
                },
                vertAlign:"middle"
            },
            {
                title:'Qualifying Non-hospitalized Patients',
                cssClass:"dark:!bg-slate-800 text-theme1 dark:text-theme4",
                columns:[
                    {
                        title:"Importance", 
                        field:"nonhosp_importance", 
                        cssClass:"dark:!bg-slate-800 dark:text-white",
                        sorter: 'number',
                        formatterParams:{
                            color: function(value){
                                if(value !== "*"){
                                    return 'fill-theme1 dark:fill-theme4'
                                }
                            },
                            max: nonHospMax
                        },
                        formatter: d3_hor_bar
                    },
                    {
                        title:"Odds Ratio (95% CI)", 
                        field:"nonhosp_odds_box",
                        cssClass:"dark:!bg-slate-800 dark:text-white",
                        formatter: d3_dot,
                        formatterParams:{
                            color:'fill-theme1 dark:fill-theme4',
                            stroke: 'stroke-theme1 dark:stroke-theme4',
                            textColor: 'text-theme1 dark:text-theme4'
                        },
                        // headerSort:false
                        sorter:function(a, b, aRow, bRow, column, dir, sorterParams){
                            //you must return the difference between the two values
                            return a[0] - b[0];
                        },
                    },
                ]
            },
            {   
                title:'Qualifying Hospitalized Patients', 
                cssClass:"dark:!bg-slate-800 text-theme2 dark:text-theme5",
                columns:[
                    {
                        title:"Importance", 
                        field:"hosp_importance",
                        cssClass:"dark:!bg-slate-800 dark:text-white",
                        sorter: 'number',
                        formatterParams:{
                            color: function(value){
                                if(value !== "*"){
                                    return 'fill-theme2 dark:fill-theme5'
                                }
                            },
                            max: hospMax
                        },
                        formatter: d3_hor_bar
                    },
                    {
                        title:"Odds Ratio (95% CI)", 
                        field:"hosp_odds_box",
                        cssClass:"dark:!bg-slate-800 dark:text-white",
                        formatter: d3_dot,
                        formatterParams:{
                            color:'fill-theme2 dark:fill-theme5',
                            stroke: 'stroke-theme2 dark:stroke-theme5',
                            textColor: 'text-theme2 dark:text-theme5'
                        },
                        // headerSort:false
                        sorter:function(a, b, aRow, bRow, column, dir, sorterParams){
                            //you must return the difference between the two values
                            return a[0] - b[0];
                        },
                    },
                ]
            },
            {   
                title:'All Qualifying Patients',
                cssClass:"dark:!bg-slate-800 text-theme3 dark:text-theme6",
                columns:[
                    {
                        title:"Importance", 
                        field:"all_importance",
                        cssClass:"dark:!bg-slate-800 dark:text-white",
                        sorter: 'number',
                        formatterParams:{
                            color: function(value){
                                if(value !== "*"){
                                    return 'fill-theme3 dark:fill-theme6'
                                }
                            },
                            max: allMax
                        },
                        formatter: d3_hor_bar
                    },
                    {
                        title:"Odds Ratio (95% CI)", 
                        field:"all_odds_box",
                        cssClass:"dark:!bg-slate-800 dark:text-white",
                        formatter: d3_dot,
                        formatterParams:{
                            color:'fill-theme3 dark:fill-theme6',
                            stroke: 'stroke-theme3 dark:stroke-theme6',
                            textColor: 'text-theme3 dark:text-theme6'
                        },
                        // headerSort:false
                        sorter:function(a, b, aRow, bRow, column, dir, sorterParams){
                            //you must return the difference between the two values
                            return a[0] - b[0];
                        },
                    },
                ]
            }
            
        ],
    });
    }
    axios.get('https://labs.cd2h.org/n3c-cohort/feeds/long_covid_summary.jsp').then(res=>{
    // axios.get('/data.json').then(res=>{
        //get box figure boundaries
        let boxConfig ={};
        //collect all numbers of 
        let nonHospOddsNumbers = [];
        let HospOddsNumbers = [];
        let allOddsNumbers = [];
        //prep data
        let data = res.data.map(function(o) { 
            //Non Hosp Odds Plot Points
            o.nonhosp_odds_box = [];
            if (o.nonhospodds_ratio__95__ci_ !== null) {
                if (o.nonhospodds_ratio__95__ci_ == 'see discussion') {
                    o.nonhosp_odds_box.push('see discussion');
                }else{
                    // data looks like "5.59 (4.98 - 6.28)"
                    let v = o.nonhospodds_ratio__95__ci_.replace(/[()]/g, '').replace(' - ', ' ');
                    //[5.59, 4.98, 6.28]
                    let parts = v.split(' ').map(n => parseFloat(n));
                    parts.forEach(n => {
                        o.nonhosp_odds_box.push(n);
                        nonHospOddsNumbers.push(n);
                    })
                }
            }
            //Hosp Odds Plot Points
            o.hosp_odds_box = [];
            if (o.hosp_odds_ratio__95__ci_ !== null) {
                if (o.hosp_odds_ratio__95__ci_ == 'see discussion') {
                    o.hosp_odds_box.push('see discussion');
                } else {
                    // data looks like "5.59 (4.98 - 6.28)"
                    let v = o.hosp_odds_ratio__95__ci_.replace(/[()]/g, '').replace(' - ', ' ');
                    //[5.59, 4.98, 6.28]
                    let parts = v.split(' ').map(n => parseFloat(n));
                    parts.forEach(n => {
                        o.hosp_odds_box.push(n);
                        HospOddsNumbers.push(n);
                    })
                }
                
            }
            //All Odds Plot Points
            o.all_odds_box = [];
            if (o.all_odds_ratio__95__ci_ !== null) {
                if (o.all_odds_ratio__95__ci_ == 'see discussion') {
                    o.all_odds_box.push('see discussion');
                } else {
                    // data looks like "5.59 (4.98 - 6.28)"
                    let v = o.all_odds_ratio__95__ci_.replace(/[()]/g, '').replace(' - ', ' ');
                    //[5.59, 4.98, 6.28]
                    let parts = v.split(' ').map(n => parseFloat(n));
                    parts.forEach(n => {
                        o.all_odds_box.push(n);
                        allOddsNumbers.push(n);
                    })
                }
            }
            //return new object with new fields
            return o
        });

        boxConfig['nonhospodds_ratio__95__ci_']= {max: 0, min: 0}
        boxConfig['nonhospodds_ratio__95__ci_'].max = Math.max.apply(Math, nonHospOddsNumbers)
        boxConfig['nonhospodds_ratio__95__ci_'].min = Math.min.apply(Math, nonHospOddsNumbers)

        boxConfig['hosp_odds_ratio__95__ci_']= {max: 0, min: 0}
        boxConfig['hosp_odds_ratio__95__ci_'].max = Math.max.apply(Math, HospOddsNumbers)
        boxConfig['hosp_odds_ratio__95__ci_'].min = Math.min.apply(Math, HospOddsNumbers)

        boxConfig['all_odds_ratio__95__ci_']= {max: 0, min: 0}
        boxConfig['all_odds_ratio__95__ci_'].max = Math.max.apply(Math, allOddsNumbers)
        boxConfig['all_odds_ratio__95__ci_'].min = Math.min.apply(Math, allOddsNumbers)
        // console.log('nonHospOddsNumbers', nonHospOddsNumbers)
        // console.log('CONFIG', JSON.stringify(boxConfig, null, 2))

        tableData = data.map((obj) => {
            
            //remove all commas
            if(Object.hasOwnProperty.call(obj, 'all_importance')){
                obj.all_importance = obj.all_importance.replace(/,/g, '');
            }
            if(Object.hasOwnProperty.call(obj, 'nonhosp_importance')){
                obj.nonhosp_importance = obj.nonhosp_importance.replace(/,/g, '')
            }
            if(Object.hasOwnProperty.call(obj, 'hosp_importance')){
                obj.hosp_importance = obj.hosp_importance.replace(/,/g, '');
            }
            //add box plot max and min
            if (obj && obj.nonhosp_odds_box.length) {
                if (obj && boxConfig['nonhospodds_ratio__95__ci_']) {
                    obj.nonhosp_odds_box.push(boxConfig['nonhospodds_ratio__95__ci_'].max)
                }
            }
            if (obj && obj.hosp_odds_box.length) {
                if (obj && boxConfig['hosp_odds_ratio__95__ci_']) {
                    obj.hosp_odds_box.push(boxConfig['hosp_odds_ratio__95__ci_'].max)
                }
            }
            if (obj && obj.all_odds_box.length) {
                if (obj && boxConfig['all_odds_ratio__95__ci_']) {
                    obj.all_odds_box.push(boxConfig['all_odds_ratio__95__ci_'].max)
                }
            }
            return obj
        })
        //remove * values, then get max for bars
        nonHospMax = Math.max.apply(Math, data.map(function(o) { return o.nonhosp_importance }).filter((value) => value !== '*'))
        hospMax = Math.max.apply(Math, data.map(function(o) { return o.hosp_importance }).filter((value) => value !== '*'))
        allMax = Math.max.apply(Math, data.map(function(o) { return o.all_importance }).filter((value) => value !== '*'))
        draw();
    }).catch(err=> {
        throw err;
    });

    //give enough time to render before initializing tooltips
    setTimeout(function(){
        tippy('[data-toggle]',{
          theme: 'n3c'
        });
    }, 1000)     
    
    // expose to template and other options API hooks
    return {}
  }
}
</script>
