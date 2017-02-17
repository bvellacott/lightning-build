var jsforce = require('jsforce');
var conn = new jsforce.Connection();
conn.login('bvellacott@yahoo.com', 'London2017yj1bP8QNGrB2SUbKFjMAUSSZ9', function(err, res) {
  if (err) { return console.error(err); }
  // conn.sobject('AuraDefinitionBundle').create({
  // 	Language: 'en_US',
  // 	MasterLabel: 'ExcitingBundle2',
  // 	ApiVersion: 39.0,
  // 	Description: 'Exciting to see if this bundle is created',
  // 	DeveloperName: 'ExcitingBundle2'
  // })
  // .then(function(result) {
  // 	console.log(result);
  // })
  // .catch(function(err) {
  // 	console.error(err);
  // });
  // conn.sobject('AuraDefinition').create({
  // 	AuraDefinitionBundleId: '0Ab24000000PMzMCAW',
  // 	DefType: 'APPLICATION',
  // 	Format: 'XML',
  // 	Source: '<aura:application ></aura:application>'
  // })
  // .then(function(result) {
  // 	console.log(result);
  // })
  // .catch(function(err) {
  // 	console.error(err);
  // });

  var type = 'AuraDefinition';
  var query = "AuraDefinitionBundleId = '0Ab24000000PN3YCAW' and DefType = 'CONTROLLER'";
  conn.sobject(type).findOne(query)
  .execute((findErr, record) => {
    if(findErr) {
      console.error(findErr);
      console.log("failed to update the " + type);
      return reject(findErr);
    }
    if(!record) {
      console.error("a " + type + " with the query: " + query + " doesn't exist on the server");
    }
    console.log(record);

  });

});