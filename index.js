const soap = require('soap');
const format = require('xml-formatter');

const url = 'https://scadaservice.scatecsolar.com/KeyPerformanceService.svc?wsdl';

// credencials
const AF = {
  plantName: 'UA-AF',
  authenticationKey: '675a4883-d56f-452d-9c54-5fa283bcf2b0',
  userName: 'Ext_Rengy',
  password: 'PViewRengy2021!',
};

// parameters (with credencials)
const args = { 
  ...AF,
  periodStartTime: '2020-02-01T00:00:00',
  periodEndTime: '2020-03-01T00:00:00',
  interval: '30 min',
  forecastResultParameters: {
    attributes: {
      'xmlns:d4p1': 'http://schemas.microsoft.com/2003/10/Serialization/Arrays',
      'xmlns:i': 'http://www.w3.org/2001/XMLSchema-instance',
    },
    $xml: '<d4p1:string>ActivePowerProduction</d4p1:string><d4p1:string>ActiveEnergyProduction</d4p1:string><d4p1:string>InclineIrradiation</d4p1:string>',
  },
};

const header = '<Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">http://tempuri.org/IKeyPerformanceS ervice/GetPlantForecastData</Action>';

soap.createClient(url, function(err, client) {
  if (err) console.log(err); 
  // if (client) console.log(client); 
  client.addSoapHeader(header);
  client.GetPlantForecastData(args, function(err, result) {
    if (err) console.log(err); 
    var formattedXml = format(client.lastRequest);

    console.log('last request: ', formattedXml) // <-- request logs here
    
    console.log(result);
  });
});

{/*
<d4p1:string>ActivePowerProduction</d4p1:string>
<d4p1:string>ActiveEnergyProduction</d4p1:string>
<d4p1:string>InclineIrradiation</d4p1:string>
<d4p1:string>HorizontalIrradiation</d4p1:string>
<d4p1:string>AmbientTemperature</d4p1:string>
*/}
