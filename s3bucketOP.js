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
		bucketName = helper_argv.bucketname.trim() ;

	if (helper_argv.hasOwnProperty('bucketregion'))
		bucketRegion = helper_argv.bucketregion;
		
	awsWorker.createBucket( {bucketName:bucketName, bucketRegion:bucketRegion} ) ;
	
} else if (command === 'deletebucket') {
	let bucketName = '', bucketRegion = '';
	if (helper_argv.hasOwnProperty('bucketname'))
		bucketName = helper_argv.bucketname.trim();
	
	if (bucketName === '') {
		return console.log(`Specify the Bucket`);		
	}
	awsWorker.deleteOBucket({ bucketName: bucketName});
	

} else if (command === 'addobject') {
	// Upload an object to the specifed bucket.
	let bucketName = '', bucketRegion = '', uploadObject = '';
	
	if (helper_argv.helper_argv.hasOwnProperty('bucketname'))	
		bucketName = helper_argv.helper_argv.bucketname.trim();		
	if (bucketName === '') 
		return console.log(`Specify the Bucket`);

	if (helper_argv.helper_argv.hasOwnProperty('uploadobject'))
		uploadObject = helper_argv.helper_argv.uploadobject;
	if (uploadObject === '')
		return console.log(`Specify the upload object`);

	awsWorker.uploadObject({ bucketName: bucketName, bucketRegion: bucketRegion, uploadFile: uploadObject });
	
} else if (command === 'deleteobject') {

}