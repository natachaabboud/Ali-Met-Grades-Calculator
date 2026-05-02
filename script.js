let template=null;
let next_button = document.querySelector('.next-button-div');
let body_question = document.querySelector('.body-question');
let body_content = document.querySelector('.body-content')
let body_container = document.querySelector('.body-container');
let random_button_div = document.querySelector('.random-button-div');
let title_content = document.querySelector('.title-content');
let grades_table = document.querySelector('.grades-table');
let grades_table_body = grades_table.querySelector('.grades-table-body')
let grades_table_rows = grades_table_body.getElementsByTagName('tr');

let course_creator_interface = document.querySelector(".course-creator-interface");

let grades_table_grades=[];
let grades_table_inputs=[];

for(row of grades_table_rows){
    let current_grade=row.querySelector('td:last-child input')
    grades_table_grades.push(current_grade);
}

let grades_table_text = document.querySelector('.grades-table-text');
let generator_interface = document.querySelector(".generator-interface");
let generator_interface_table = document.querySelector(".generator-interface-table");

let gpa_result = document.querySelector(".gpa-result");
let gpaFlag=false;
let gpa_value_0=0;
let credits_sum=0;

let min_grade_input=document.getElementById("min-grade-input");
let max_grade_input=document.getElementById("max-grade-input");
let min_grade_row = document.getElementById("min-grade-row");
let max_grade_row = document.getElementById("max-grade-row");

let absurdMode=false;
let gpaMode=0;
// mode 0 = random;
// mode 1 = value
// mode 2 = range

//for THE LAZY

/*
let I2206 = document.getElementById("I2206")
let I2207 = document.getElementById("I2207")
let I2208 = document.getElementById("I2208")
let I2209 = document.getElementById("I2209")
let I2210 = document.getElementById("I2210")
let I2211 = document.getElementById("I2211")
let I2234 = document.getElementById("I2234")
*/

let all_credits = [5,4,4,4,5,5,3];
//let all_courses=[I2206, I2207, I2208, I2209, I2210, I2211, I2234];
let courseList = [];

let nevergonnagiveyouup = new Audio("nevergonnagiveyouup.mp3");

class Course{
    constructor(code, eng_name, credits){
        this.code=code;
        this.eng_name=eng_name;
        this.fr_name=eng_name;
        this.optgroup=-1;
        this.optgrouplimit=-1;
        this.credits=parseInt(credits);
    }
}

let I2206 = new Course("I2206", "Data Structures", 5);
let I2207 = new Course("I2207", "Computer Architecture II", 4);
let I2208 = new Course("I2208", "Networking", 4);
let I2209 = new Course("I2209", "Logic Programming", 4);
let I2210 = new Course("I2210", "Relational Databases", 5);
let I2211 = new Course("I2211", "Object Oriented Programming", 5);
let I2235 = new Course("I2235", "Image Processing", 3);

let C2206 = new Course("C2206", "Data Structures", 5);
let C2207 = new Course("C2207", "Computer Architecture II", 4);
let C2208 = new Course("C2208", "Networking", 4);
let C2209 = new Course("C2209", "Logic Programming", 4);
let C2210 = new Course("C2210", "Relational Databases", 5);
let C2211 = new Course("C2211", "Object Oriented Programming", 5);
let C2235 = new Course("C2235", "Image Processing", 3);

function mainProgram(){
    if(template=="template_cs_4"){
        courseList=[I2206,I2207,I2208,I2209,I2210,I2211,I2235];
    }
    else if (template=="template_chemistry_4"){
        courseList=[C2206,C2207,C2208,C2209,C2210,C2211,C2235];
    }
    else if (courseList=[]) {
        createCourseList();
        return;
    }

    
    for(let x of courseList){
        credits_sum+=x.credits;
    }

    fillGradesTable(courseList);
    
    body_container.style.display="flex";
    grades_table.style.display="block";
    grades_table_text.style.display="flex";
    random_button_div.style.display="flex";

    // automatically updating the gpa every 100ms
    intermittent_gpa_check = setInterval(check_gpa, 100);
    

}


function createCourseList(){

    let isDone=false;

    body_container.style.display="none";
    course_creator_interface.style.display="flex";


    // empty screen with only two buttons: add and done
    // add: blur everything, show a small table with two rows
    // first row: course code
    // second row: course credits
    // in the middle: "ok"

    // when ok is pressed, show a small list of the form:
    // I2204, 6 credits
    // I2205, 3 credits


    // when done button is clicked, return the courseList

    

}

function fillGradesTable(courseList){
    let tableHTML="";

    for (let course of courseList) {
        tableHTML += "<tr>";
        tableHTML += "<td>" + course.code + "</td>";
        tableHTML += "<td>" + course.credits + "</td>";
        tableHTML += "<td>" + "<input id='" + course.code + "'>" + "</td>";
        tableHTML += "</tr>"
    }

    grades_table_body.innerHTML=tableHTML;
}

function chooseOpt(user_template){

    if (!template){
        body_question.style.top="345px"
        setTimeout(() => {next_button.style.display="flex";}, 700)
    }
    else{
        document.getElementById(template).classList.remove('selected');
        next_button.style.display="flex";
    }
    template = user_template;
    document.getElementById(user_template).classList.add('selected');    
    
}

function nextDisplayMode(){
    body_container.style.animation="ease-out-bottom 1s ease";
    setTimeout(displayMode,950);
}

function displayMode(){
    body_container.style.display="none";
    title_content.style.display="none";
    body_content.style.display="none";
    mainProgram();
}


function check_gpa(){
    grades_table_rows = grades_table_body.getElementsByTagName('tr');
    let gpa_value=0;

        //we iterate through all rows

        for (let i=0; i<grades_table_rows.length; i++){
            let curr_row = grades_table_rows[i];

            //getting the value of the input of the current row
            let grade_input = curr_row.querySelector("input").value;
            if(!grade_input || isNaN(grade_input)){
                hideGPA();
                return;
            }
            else{
                gpa_value+=grade_input*courseList[i].credits;
            }
        }


        gpa_value=(gpa_value/credits_sum).toFixed(2);

        gpa_result.innerHTML=`<p> GPA: ${gpa_value} </p>`;

        if(!gpaFlag){
            gpaFlag=true;
            gpa_result.style.animation="ease-right 1s ease";
            gpa_result.style.display="block";
        }
        else if (gpa_value != gpa_value_0){
            gpa_result.style.animation="shake 0.3s ease";
            setTimeout( () => {
                gpa_result.style.animation="none"
            }, 
            300 );
        }
    gpa_value_0=gpa_value;
}


function hideGPA(){
    
    if (gpaFlag){
        gpa_result.style.animation="ease-out-right 1s ease";
        gpa_result.addEventListener("animationend", byeBye = () => {
            gpa_result.style.display="none";
            gpa_result.removeEventListener("animationend", byeBye);
        } )
        gpaFlag=false;
    }

}

function rickroll(){

    let i=1;

    let rickImg=document.createElement("img");

    rickImg.setAttribute("src", "rickroll-roll.gif");

    rickImg.classList.add("bashar");

    document.body.appendChild(rickImg);

    setTimeout(
        () => {
            nevergonnagiveyouup.play();
            nevergonnagiveyouup.loop = true;

            setInterval(generateRickrollImage, 150);

        },
        1000
    );
}


function generateRickrollImage(){
    let n = Math.floor(Math.random()*180 - 90);
    let x = Math.floor(Math.random()*150 - 50);
    let y = Math.floor(Math.random()*150 - 50);
    let z = Math.floor(Math.random()*100 + 169);
    let basharImg2 = document.createElement("img");
    basharImg2.setAttribute("src", "rickroll-roll.gif");
    basharImg2.setAttribute("width", z + "px");
    basharImg2.classList.add("bashar-secondary");
    basharImg2.style.left=x.toString()+"%";
    basharImg2.style.top=y.toString()+"%";
    basharImg2.style.rotate=n.toString() + "deg";

    document.body.appendChild(basharImg2);

}

function randomGeneratorInterface(){
    generator_interface.style.display="flex";
}

function randomGeneratorBack(){
    generator_interface.style.display="none";
}


function gpaToggle(a){
if(gpaMode === 0){
        a.textContent="Value";
        gpaMode++;

        let gpa_value_row = document.createElement('tr');
        gpa_value_row.id = "gpa-value-row";
        gpa_value_row.innerHTML='<td> GPA value: </td> <td> <input id="gpa-value-input"> </td>';
        generator_interface_table.querySelector('.table-body').insertBefore(gpa_value_row,min_grade_row);
    }
    else if(gpaMode===1){
        if(document.getElementById('gpa-value-row')){
            document.getElementById('gpa-value-row').remove();
        }
        a.textContent="Range";
        gpaMode++;
    }
    else if(gpaMode===2){
        a.textContent="Random";
        gpaMode=0;
        
    }
}

function absurdToggle(a){
    absurdMode=!absurdMode;
    if(absurdMode===false){
        a.textContent="OFF";
        min_grade_input.toggleAttribute('disabled', false);
        max_grade_input.removeAttribute('disabled', false);
    }
    else if(absurdMode===true){
        a.textContent="ON";
        min_grade_input.toggleAttribute('disabled', true)
        max_grade_input.toggleAttribute('disabled', true);
    }
}

function checkGeneratorInputs(){
    return;
}

function randomGenerator(){
    if(gpaMode===0){
        if(absurdMode){
            for(let row of grades_table_rows){
                let grade = row.querySelector("input");
                let x = Math.floor(Math.random()*2001-1000);
                grade.value=x;
            }
        return;
        }
        else{
            let x = parseFloat(max_grade_input.value);
            let y = parseFloat(min_grade_input.value);
            for(let row of grades_table_rows){
                let grade = row.querySelector("input");
                let z= Math.floor(Math.random()*(x-y+1)+y);
                grade.value=z;
            }
        }

    }
    if(gpaMode===1){
        let gpa_value=parseFloat(document.getElementById('gpa-value-input').value);

        let min_grade = parseFloat(min_grade_input.value);
        let max_grade = parseFloat(max_grade_input.value);

        let remaining = gpa_value*credits_sum;
        let upper = max_grade*credits_sum;
        let lower = min_grade*credits_sum;

        let generated_grades=new Array(courseList.length);

        let n = 0;

        // note: weighted here is used to denote grades multiplied by their respective credits.

        // idea: when we multiply the desired gpa by the sum of credits, we get like a "fund" from which we can subtract
        // the randomly generated grades, provided that the portion left allows for the randomly generated grades to fit
        // the gpa requirement. we call that portion "remaining" in the code.
        // after each iteration, we subtract the weighted generated grade from the "fund", i.e from "remaining".
        // "remaining" has to be around 0 at the end of the iterations.

        // upper: grades to be generated after the one we're currently working with
        // must add up, when multiplied by their respective credits, to at most "upper".

        // upper: grades to be generated after the one we're currently working with
        // must add up, when multiplied by their respective credits, to at least "lower".


        // to make sure that the generated weighted grade fits the constraints, we follow this idea:
        // finding the minimum:
        // 1) it has to be >= than the minimum grade provided by the user, so we introduced a variable
        // "weighted_min" that is the min grade multiplied by the course's credits.
        // 2) it has to be >=a, such that a is the portion obtained by subtracting "upper" from "remaining".
        // in other words, a is the value that the current grade would get if all subsequent grades
        // were maxxed out. 
        // we take the maximum of 1) and 2).

        // similar reasoning to find the maximum value allowed for the generated weighted grade.


        // randomness is introduced because if we were to iterate through each
        // row by order, the first row would have more "freedom" in its values, i.e, a bigger range,
        // leaving increasingly smaller ranges for following numbers, which means that 
        // bottom rows will often have similar values.
        // we want to avoid that.

        let random_values=[];
        for(let i=0; i<courseList.length; i++){
            random_values[i]=i;
        }


        while(random_values.length>0){

            let k = Math.floor(Math.random()*(random_values.length));
            console.log("k = " + k);

            let i = random_values[k];
            random_values[k] = random_values[random_values.length-1];
            random_values.pop();

            console.log("i = " + i);
            console.log("course: " + courseList[i].code);

            let weighted_min = courseList[i].credits*min_grade;
            let weighted_max = courseList[i].credits*max_grade;

            upper = upper - weighted_max;
            lower = lower - weighted_min;

            let a = remaining - upper;
            let b = remaining - lower;


            a = Math.max(a,weighted_min);
            b = Math.min(b,weighted_max);

            n = Math.floor(Math.random()*(b-a+1)+a);
            generated_grades[i]=n;
            remaining=remaining-n;
        }
        //generated_grades.push(remaining);

        // DELETE
        /*
        for(let i=0; i < grades_table_rows.length-1; i++){
            let weighted_min = all_credits[i]*min_grade;
            let weighted_max = all_credits[i]*max_grade;

            upper = upper - weighted_max;
            lower = lower - weighted_min;

            let a = remaining - upper;
            let b = remaining - lower;


            a = Math.max(a,weighted_min);
            b = Math.min(b,weighted_max);

            n = Math.floor(Math.random()*(b-a+1)+a);
            generated_grades.push(n);
            remaining=remaining-n;
        }
        generated_grades.push(remaining);
        */

        for(let i=0; i<generated_grades.length; i++){
            generated_grades[i] = (generated_grades[i]/courseList[i].credits).toFixed(2);
        }
        for(let i=0; i<grades_table_rows.length; i++){
            let curr_row = grades_table_rows[i];
            let curr_grade = curr_row.querySelector("input");
            curr_grade.value = Math.ceil(generated_grades[i]);
        }

    }
}