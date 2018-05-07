/*
 * Modified by : Devendra Walanj
 * Purpose : Performing a CURD operation on the AWS S3 
**/

// Load the SDK and UUID
// const yargs = require('yargs');
const awsWorker = require('./codeSrc/worker');
const helper_argv = require('./codeSrc/helpers/helper-argv') ;

let command = helper_argv.helper_argv._[0];
// console.log(`fire helper ${JSON.stringify(helper_argv)} `);
// console.log(`fire command ${command} `);

if (command === 'listbucket') {
	awsWorker.listBuckets() ;

} else if (command === 'addbucket') {
	// Create a bucket and upload something into it
	let bucketName = '', bucketRegion = '' ;
	if (helper_argv.hasOwnProperty('bucketname')) 
		bucketName = argv.bucketname.trim() ;

	if (helper_argv.hasOwnProperty('bucketregion'))
		bucketRegion = argv.bucketregion;
		
	awsWorker.createBucket( {bucketName:bucketName, bucketRegion:bucketRegion} ) ;
	
} else if (command === 'deletebucket') {
	let bucketName = '', bucketRegion = '';
	if (helper_argv.hasOwnProperty('bucketname'))
		bucketName = argv.bucketname.trim();
	
	if (bucketName === '') {
		return console.log(`Specify the Bucket`);		
	}
	awsWorker.deleteOBucket({ bucketName: bucketName});
	

} else if (command === 'addobject') {

} else if (command === 'deleteobject') {

}