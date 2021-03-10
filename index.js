const soap = require('soap');
const url = 'https://scadaservice.scatecsolar.com/KeyPerformanceService.svc?wsdl';

const AF = {
  authenticationKey: '675a4883-d56f-452d-9c54-5fa283bcf2b0',
  userName: 'Ext_Rengy',
  password: 'PViewRengy2021!',
  deviceID: 'test',
};

const args = { ...AF };

soap.createClient(url, function(err, client) {
  if (err) console.log(err); 
  if (client) console.log(client); 
  client.GetPlantData(args, function(err, result) {
    if (err) console.log(err); 
    console.log('last request: ', client.lastRequest) // <-- request logs here
    console.log(result);
  });
});