// Fetch  Example
// Fetch Request for all users
// fetch('/searchUser')
//     .then(response => response.json())
//     .then(user =>  {
//         TotalUsersPoints = user[0].smokerInfo.points;
//         TotalUsersDaysSmokeFree = user[0].smokerInfo.total_days_smoke_free;
//         TotalUsersSavings = user[0].smokerInfo.cost_of_cigs_saved;
//     }).catch(function(err) {
//     // Error :(
// });

// url (required), options (optional)
fetch('https://swapi.co/api/people/1/', {
    method: 'get'
}).then(response => response.json())
    .then(data => {
    console.log(data);

    }).catch(function(err) {
    // Error :(
});


// Fetch Bridge API Real Estate Data
fetch('https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=2ba8fa6f17982e93245b4ad50d6fbe38', {
    method:'get'
}).then(response => response.json())
    .then(data => {
        console.log(data);
        console.log('All data ' + data);
        console.log('Data key size: ' + Object.keys(data).length);
        console.log('First object in array ' + data[0]);
        console.log('test ========= '  );
        console.log(data.value[0])



    }).catch(function (err) {
        return "Fetch error :)"
        // Error :(

    });