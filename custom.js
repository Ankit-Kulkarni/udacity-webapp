        var global_data = "";
        var current_data = [];
        var global_track = [];
        var selected_track =[];

        function capitalizeFirstLetter(val) {
            // body...
            return val.charAt(0).toUpperCase() + val.slice(1);
        }

        function sort (val) {
            /* called after the selection from the level */
            build_html_element(global_data, val); /*building the dom of the page using global data only*/
        }

        function filter_by_track(val){
            // body...
           level_val = $('#level-list').val() ;
           console.log(val.checked);
           if(val.checked == true){
           selected_track.push(val.id);
           }
           else {
            var index = selected_track.indexOf(val.id);
            selected_track.splice(index, 1);
           }

           console.log("length is "  + selected_track.length);
           var data_local = $.extend(true, {}, global_data);
           build_html_element(data_local,level_val);/*sending current data to filter by track*/

        }

        function build_html_element(data, level_val) {
        // body...
        var condition = false;
        current_data['courses']=[];      /* emptying the current_data['courses'] value to assign the new courses from below*/
        html_element = ""; 
        $("#course-list").html(""); /* clearing the html of the page*/
        console.log("inside  build html ");
        console.log(data)
        
        $.each(data.courses, function(count) {
            title = data.courses[count].title;
            homepage = data.courses[count].homepage;
            subtitle =data.courses[count].subtitle;
            level = capitalizeFirstLetter(data.courses[count].level);
            short_summary =data.courses[count].short_summary ;
            image =data.courses[count].image;
            teaser_video =data.courses[count].teaser_video;
            summary =data.courses[count].summary;
            required_knowledge =data.courses[count].required_knowledge;
            expected_learning =data.courses[count].expected_learning;
            syllabus =data.courses[count].syllabus;
            expected_duration =data.courses[count].expected_duration;
            expected_duration_unit =data.courses[count].expected_duration_unit;
            new_release =data.courses[count].new_release;
            track =data.courses[count].tracks;
            is_selected_track_set = selected_track.length;
            console.log("length is "+ is_selected_track_set);
            if (is_selected_track_set) {
                // if the selected tracks are set 
                var flag;
                console.log("track set " + track);
                for (var i = selected_track.length - 1; i >= 0; i--) {
                flag = track.indexOf(selected_track[i]) ;
                console.log("flag is " + flag);
                    if ( flag>= 0) {
                        console.log("track is " + track);
                        console.log("selected is " + selected_track);

                        if (level_val == "All" || level_val ==level) { condition = true;break;} else{ condition=false;};
                        
                    }
                    else{
                        condition =false;
                    }
                    
                }
            } else{
            if (level_val == "All" || level_val ==level) { condition = true;} else{ condition=false;};
            }
        
            if (condition) {
                // console.log("condition is " + condition);
                current_data['courses'].push(data.courses[count]);

                
                
                html_element = "<div class='row'><div class='col-md-12'><div  class='col-md-3'><br><img class='img-responsive thumbnail' src='" + image + "'></div><div class='col-md-9'><br><a class='course-title' href='#' > "+ title +"</a><span class='course-subdescription'>"+ subtitle+" </span> <label class='label label-default pull-right'> "+ level +"</label> <br><p class='description' >"+short_summary+"</p><a class='label label-danger' href='"+"#summary" +"'> view details </a>&nbsp;&nbsp;<a class='label label-danger' href='"+"#syllabus "+"'> syllabus </a>&nbsp;&nbsp;<a class='label label-danger' href='"+teaser_video +"'> Watch intro video </a>&nbsp;&nbsp;<h5><a class='label label-danger pull-right' href='"+homepage +"'> view it in browser </a></h5></div></div></div>"
           
                $("#course-list").append(html_element);
            }/*if end */

        });/*$each end*/
        
    }

    function load_track() {
        // body...
        $.each(global_track , function(count) {
            // body...
            var tracks = "<div class='checkbox' ><label><input type='checkbox' id='"+ global_track[count]+ "'onclick='filter_by_track(this)'>" + global_track[count]+"</input></label></div>";
            $('#tracks').append(tracks);
        });

    }

    function getdata() {
        // body...
            $.getJSON("udacity-data.json", function(data) {
                var title, homepage,subtitle, level, shortdesc, image, teaser_video, summary, short_summary, required_knowledge =""
                var expected_learning, syllabus, expected_duration, expected_duration_unit, new_release ="";
                var track=[];
                var html_element ="";
        /*ended the build_html_element function*/
                global_data= data;/*  setting the gobal data for all courses | persistance  */
                current_data= $.extend(true, {}, data);/*  setting the current data for all courses | modification possible  */
                console.log(current_data);
               $.each(data.tracks, function(count) {
                   // body...
                global_track.push(data.tracks[count]['name']);

               
               })
               
              
               load_track();/*loading tracks in side bar*/

            build_html_element(data, "All");/*default loading of all courses on first load*/
            });
            
    }

    function changePage (argument) {
        // body...
             $("#course-list").load( "udacity-data.json", function() {
          alert( "Load was performed." );
        });
    }


$(document).ready(function(){

getdata();
});/*$document.ready end */



