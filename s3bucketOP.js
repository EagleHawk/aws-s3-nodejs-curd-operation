/*
 * Modified by : Devendra Walanj
 * Purpose : Performing a CURD operation on the AWS S3 
**/

// Load the SDK and UUID
const yargs = require('yargs');
const awsWorker = require('./workingforce/worker');
const bucketNameOption = {
	describe: 'Specifies the bucket name',
	demand: true,
	alias: 'bn'
};
const bucketRegionOption = {
	describe: 'Specifies the bucket region, if not specified then default region will be us-west-1',
	demand: false,
	alias: 'br'
}
const argv = yargs
	.command('addbucket', 'Add a new bucket.', {
		bucketname: {
			describe: 'Specifies the bucket name, if not specified then name will be like node-sdk-00-<<random id>>',
			demand: false,
			alias: 'bn'
		},
		bucketregion: bucketRegionOption
	})
	.command('listbucket', 'Lists all the buckets created by user.')
	.command('deletebucket', 'Deletes a specified bucket.', {
		bucketname: bucketNameOption
	})
	.argv;
let command = argv._[0];
// console.log(`fire argv ${JSON.stringify(argv)} `);
// console.log(`fire command ${command} `);


// var bucketName = 'node-sdk-sample-' + uuid.v4();
// var keyName = 'hello_world.txt';

if (command === 'listbucket') {
	awsWorker.listBuckets() ;

} else if (command === 'addbucket') {
	// Create a bucket and upload something into it
	let bucketName = '', bucketRegion = '' ;
	if (argv.hasOwnProperty('bucketname')) 
		bucketName = argv.bucketname.trim() ;

	if (argv.hasOwnProperty('bucketregion'))
		bucketRegion = argv.bucketregion;
		
	awsWorker.createBucket( {bucketName:bucketName, bucketRegion:bucketRegion} ) ;
	
} else if (command === 'deletebucket') {
	let bucketName = '', bucketRegion = '';
	if (argv.hasOwnProperty('bucketname'))
		bucketName = argv.bucketname.trim();
	
	if (bucketName === '') {
		return console.log(`Specify the Bucket`);		
	}
	awsWorker.deleteOBucket({ bucketName: bucketName});
	

} else if (command === 'addobject') {

} else if (command === 'deleteobject') {

}


// s3.createBucket({Bucket: bucketName}, function() {
//   var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//   s3.putObject(params, function(err, data) {
//     if (err)
//       console.log(err)
//     else
//       console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//   });
// });

// s3.deleteBucket({Bucket: bucketName}, (err, data) => {
//   if (err) {
//       return console.log(`Error Occured on DeleteBucket -> ${err} `);      
//   } 
//   console.log(`S3 bucket ${bucketName} deleted successfully. `);

// }) ;