
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e){
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
 
  let issues = [];

  if(localStorage.getItem('issues')){

    issues = JSON.parse(localStorage.getItem('issues'));
  }
  
  if(id && description && severity && assignedTo){
    issues.push(issue);
    localStorage.setItem('issues',JSON.stringify(issues))
  }else{
    alert("Fields Must not be Empty!");
  }
  document.getElementById('issueInputForm').reset();

  fetchIssues();
  e.preventDefault();
}



const setStatusClosed = id =>{

   let  issues = JSON.parse(localStorage.getItem('issues'));
  //  const currentIssue = issues.find(issue => issue.id == id );
  //  console.log(issues,currentIssue);
  //  currentIssue.status = "Closed"
  for (let i = 0; i < issues.length; i++) {

    if(issues[i].id == id){
      issues[i].status = 'Closed'
    }
  }
   localStorage.setItem('issues', JSON.stringify(issues));

   
  fetchIssues();

}


const deleteIssue = id =>{
  var isConfirm = confirm('Are you sure to Delete this Issue');
  if(isConfirm){
    const issues = JSON.parse(localStorage.getItem('issues'));
    // const remainingIssues = issues.filter(issue => issue.id != id);
    for (let i = 0; i < issues.length; i++) {
      if(issues[i].id == id){
        issues.splice(i, 1);
      }
      
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
  }
}


const fetchIssues = () =>{
 
  const issues = JSON.parse(localStorage.getItem('issues'));

  const issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';
  let openIssue = 0;
  let closedIssue = 0;
  for (let i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
   let descriptionToShow = null;
   let closeBtn = null;
    if(status == "Closed"){
      closedIssue++;
    descriptionToShow = `<h3 style="text-decoration:line-through">${description}</h3>`;
    closeBtn = `<a href="javascript:void(0)" disabled class="btn btn-warning"> Closed </a>`
    }else{
      openIssue++;
      descriptionToShow =` <h3> ${description} </h3>`;
      closeBtn = `<a href="javascript:void(0)" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>`


      // openIssue++;
      // descriptionToShow = `<h3> ${description} </h3>`;
      // closeBtn = `<a href="javascript:void(0)" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>`
    }
    
    issuesList.innerHTML += `<div class="well">
                            <h6> Issue Id: ${id}</h6>
                            <p><span class="label label-info">${status}</span></p>
                            ${descriptionToShow}
                            <p><span class='glyphicon glyphicon-time'></span>${ severity}</p>
                            <p><span class='glyphicon glyphicon-user'></span>${assignedTo}</p>
                            ${closeBtn}
                            <a href="javascript:void(0)" class="btn btn-danger"  onclick="deleteIssue(${id})">Delete</a>
                            </div> `
                                   
  }
  document.getElementById('closedIssueCount').innerText =closedIssue ;
  document.getElementById('OpenIssueCount').innerText = openIssue;
  document.getElementById('totalIssueCount').innerText = openIssue + closedIssue;
}