async function fetchData(){
    let res= await fetch("http://localhost:3000/getEmployee");
    let data=await res.json();
    // console.log(data);
    str=``
    
    data.map(async(employee)=>{
        // console.log(employee);
      
        str+=`<div><tr>
                            <td><input type="text" id="ID-${employee.ID}" disabled=true placeholder="" value="${employee.ID}" name="ID">
                            </td>
                            <td><input type="text" id="name-${employee.ID}" disabled=true placeholder="" value="${employee.name}" name="name"></td>
                            <td><input type="text" id="designation-${employee.ID}" disabled=true placeholder="" value="${employee.designation}" name="designation"></td>
                            <td><input type="text" id="salary-${employee.ID}" disabled=true placeholder=" " value="${employee.salary}" name="salary"></td>
                            <td><input type="text" id="experience-${employee.ID}" disabled=true placeholder="" value="${employee.experience}" name="experience">
                            </td>
                            <td><div class="bonus" id="bonus-salary-${employee.ID}"></div></td>
                            <td> <button class="edit-btn" onclick="handleEdit('${employee.ID}')">EDIT</button>
                                <button class="save-btn" onclick="handleSave('${employee.ID}')">SAVE</button>
                                <button class="delete-btn" onclick="handleDelete('${employee.ID}')">DELETE</button></td>

                        </tr></div>`
        

    })
    document.getElementById("main").innerHTML=str;

    let salary=0;
    data.map((bonus)=>{
        console.log(bonus.experience);
        
        if(bonus.experience=="1"){
            salary=parseInt(bonus.salary)+(parseInt(bonus.salary)*0.1)
        }
        else if(bonus.experience=="2"){
            salary=parseInt(bonus.salary)+(parseInt(bonus.salary)*0.15)
        }
        else if(bonus.experience=="0"){
            document.getElementById(`bonus-salary-${bonus.ID}`).style.color="red"
            document.getElementById(`bonus-salary-${bonus.ID}`).style.fontSize=12+"px"

            return document.getElementById(`bonus-salary-${bonus.ID}`).textContent=`NOT ELIGIBLE`;
            

        }
        else{
            salary=parseInt(bonus.salary)+(parseInt(bonus.salary)*0.2)

        }
        console.log(bonus.salary);
        console.log(salary);
        document.getElementById(`bonus-salary-${bonus.ID}`).textContent=`${salary}`;
    });


}

fetchData()

// edit
function handleEdit(id){
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`designation-${id}`).disabled=false
    document.getElementById(`salary-${id}`).disabled=false
    document.getElementById(`experience-${id}`).disabled=false
}

// save 
async function handleSave(id){
    let name=document.getElementById(`name-${id}`).value
    let designation=document.getElementById(`designation-${id}`).value
    let salary=document.getElementById(`salary-${id}`).value
    let experience=document.getElementById(`experience-${id}`).value

    console.log(name,designation,salary,experience);

    let data={id,name,designation,salary,experience};
    // console.log(data);
    
    let jsonData=JSON.stringify(data);
    // console.log(jsonData);
    const res=await fetch("http://localhost:3000/update",{
        method:"put",
        "Content-Type":"text/json",
        body:jsonData

    });
    const resData=await res.text()
    res.status==200?alert(resData):alert(resData);
    // console.log(resData);
    fetchData();
    



    

}

// Delete
async function handleDelete(id){
    const res=await fetch("http://localhost:3000/delete",{
        method:"delete",
        "Content-Type":"text/plain",
        body:id
    })

    const data=await res.text();

    res.status==200?alert(data):alert(data);
    fetchData();

}



// Search 

document.getElementById("search").addEventListener("keyup",async(e)=>{
    console.log(e.target.value);
    console.log(typeof(e.target.value));
    
    let res=await fetch("http://localhost:3000/getEmployee");
    let data=await res.json();

    let fData=data.filter((employee)=>employee.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
    
   
    str=``
    fData.map((employee)=>{
        str+=`<div><tr>
                            <td><input type="text" id="ID-${employee.ID}" disabled=true placeholder="" value="${employee.ID}" name="ID">
                            </td>
                            <td><input type="text" id="name-${employee.ID}" disabled=true placeholder="" value="${employee.name}" name="name"></td>
                            <td><input type="text" id="designation-${employee.ID}" disabled=true placeholder="" value="${employee.designation}" name="designation"></td>
                            <td><input type="text" id="salary-${employee.ID}" disabled=true placeholder=" " value="${employee.salary}" name="salary"></td>
                            <td><input type="text" id="experience-${employee.ID}" disabled=true placeholder="" value="${employee.experience}" name="experience">
                            </td>
                            <td><div class="bonus" id="bonus-salary-${employee.ID}"></div></td>
                            <td> <button class="edit-btn" onclick="handleEdit('${employee.ID}')">EDIT</button>
                                <button class="save-btn" onclick="handleSave('${employee.ID}')">SAVE</button>
                                <button class="delete-btn" onclick="handleDelete('${employee.ID}')">DELETE</button></td>

                        </tr></div>`

    })

    document.getElementById("main").innerHTML=str;
})



