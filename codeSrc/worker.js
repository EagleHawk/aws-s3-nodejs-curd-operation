/*
 * Created by : Devendra Walanj
 * Purpose : Add more functionality and features to the program.
**/


const uuid = require('uuid');
var AWS = require('aws-sdk');
const _REGION = 'us-west-1';
// const _REGION = 's3.us-west-1.amazonaws.com';
// const _REGION = 's3-eu-west-1.amazonaws.com';
// Create an S3 client
let s3 = new AWS.S3();  

let createBucket =  (awsS3) => {
    // Create a bucket and upload something into it
    let bucketName = awsS3.bucketName || 'node-sdk-00-' + uuid.v4();
    let bucketRegion = awsS3.bucketRegion || _REGION ;
    let params = {
        Bucket : bucketName,
        CreateBucketConfiguration: {
            LocationConstraint: bucketRegion
        }
    };
    let returndata = ''
    console.log(`******************** Creating Bucket ********************`);
    console.log(`Bucket : ${bucketName} `);
    console.log(`Region : ${bucketRegion} `);
    console.log(`*********************************************************`);
    
    s3.createBucket(params, function (err, data) {
        if (err) 
            console.log(err, err.stack); // an error occurred
        else 
            console.log(`Access Location : ${data.Location} `);           // successful response
        
            // var params = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
        // s3.putObject(params, function (err, data) {
        //     if (err)
        //         console.log(err)
        //     else
        //         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
        // });

    });
}

let deleteBucket = () => {
    return 'deleteBucket' ;
}

let listBuckets = () => {
    s3.listBuckets((err, data) => {
        if (err)
            console.log(err, err.stack); // an error occurred
        else    {
            let element = '';
            odata = data.Buckets
            odata.forEach(oBucket => {
                if (oBucket.hasOwnProperty('Name')) {
                    element += oBucket.Name + '\n';
                }
            }); 
            console.log(element);
        }
    }) ;
}

let deleteOBucket = (awsS3) => {
    let bucketName = awsS3.bucketName || '';
    if (bucketName === '') {
        return console.log('Specify the bucket name.');        
    }

    let params = {
        Bucket: bucketName,
    };
    let returndata = ''
    console.log(`******************** Deleting Bucket ********************`);
    console.log(`Bucket : ${bucketName} `);
    console.log(`*********************************************************`);
    
    s3.deleteBucket(params, (err, data) => {
        if (err)
            console.log(err, err.stack); // an error occurred
        else
            console.log(`Bucket deleted successfully. `);           // successful response
    }) ;

}

// Export the modules 
module.exports = {
    createBucket,
    deleteOBucket,
    listBuckets
}