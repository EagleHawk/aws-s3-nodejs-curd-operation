/*
 * Modified by : Devendra Walanj
 * Purpose : Performing a CURD operation on the AWS S3 
 * Change added to Git Branch B1
**/

// Load the files
const awsWorker = require('./codeSrc/worker');
const _argv = require('./codeSrc/helpers/helper-argv') ;

let command = _argv.helper_argv._[0];
// console.log(`fire helper ${JSON.stringify(helper_argv)} `);
// console.log(`fire command ${command} `);

if (command === 'listbucket') {
	awsWorker.listBuckets() ;

} else if (command === 'addbucket') {
	// Create a bucket and upload something into it
	
	let bucketName = '', bucketRegion = '' ;
	if (_argv.helper_argv.hasOwnProperty('bucketname')) 
		bucketName = _argv.helper_argv.bucketname ;
	
	if (_argv.helper_argv.hasOwnProperty('bucketregion'))
		bucketRegion = _argv.helper_argv.bucketregion;
		
	awsWorker.createBucket( {bucketName:bucketName, bucketRegion:bucketRegion} ) ;
	
} else if (command === 'deletebucket') {
	let bucketName = '', bucketRegion = '';
	if (_argv.helper_argv.hasOwnProperty('bucketname'))
		bucketName = _argv.helper_argv.bucketname;
	
	if (bucketName === '') {
		return console.log(`Specify the Bucket`);		
	}
	awsWorker.deleteOBucket({ bucketName: bucketName});
	
} else if (command === 'addobject') {
	// Upload an object to the specifed bucket.
	let bucketName = '', bucketRegion = '', uploadObject = '';
	
	if (_argv.helper_argv.hasOwnProperty('bucketname'))	
		bucketName = _argv.helper_argv.bucketname;		
	if (bucketName === '') 
		return console.log(`Specify the Bucket`);

	if (_argv.helper_argv.hasOwnProperty('uploadobject'))
		uploadObject = _argv.helper_argv.uploadobject;
	if (uploadObject === '')
		return console.log(`Specify the upload object`);

	awsWorker.uploadObject({ bucketName: bucketName, bucketRegion: bucketRegion, uploadFile: uploadObject });
	
} 	else if (command === 'deleteobject') {

}	else if (command === 'listobjects') {
	// Calls for the listing of objects in the provided buckect.
	let bucketName = '', displayMetaData = false;
	if (_argv.helper_argv.hasOwnProperty('bucketname'))
		bucketName = _argv.helper_argv.bucketname;

	if (_argv.helper_argv.hasOwnProperty('displaymeta')) {
			displayMetaData = _argv.helper_argv.displaymeta;	
	}

	if (bucketName === '') {
		return console.log(`Specify the Bucket`);
	}
	awsWorker.listBucketObjects({ bucketName: bucketName, displayMetaData: displayMetaData});
}