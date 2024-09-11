function checkId(){
    document.getElementById("ID").addEventListener("keyup",async(e)=>{
        // console.log(e.target.value);
        let res= await fetch("http://localhost:3000/getEmployee");
        let data=await res.json();


        let ExistID=data.find((item)=>{
            // console.log((item.ID));
            // console.log((e.target.value));
            return (item.ID==e.target.value.toUpperCase());
        })
        const errorMsg = document.getElementById("errorMessage");

        // undefined is same as false
        if(ExistID!=undefined){
            errorMsg.textContent="ID already Exist"
            errorMsg.style.display="block"
            errorMsg.style.color="red"
            errorMsg.style.fontWeight="bold"
            errorMsg.style.fontSize=12+"px"
            document.getElementById("add").disabled=true;
            document.getElementById("add").style.backgroundColor="rgb(136, 245, 180)";

        }
        else{
            errorMsg.textContent=""
            errorMsg.style.display="none"
            document.getElementById("add").style.backgroundColor="#037961";
            document.getElementById("add").disabled=false;




        }
        
        
        
        
    })

}

checkId()
