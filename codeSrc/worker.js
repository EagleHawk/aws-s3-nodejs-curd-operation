/*
 * Created by : Devendra Walanj
 * Purpose : Add more functionality and features to the program.
**/


const uuid = require('uuid');
var AWS = require('aws-sdk');
const {Spinner} = require('cli-spinner');
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

    let spin = new Spinner('creating bucket ... ')
    spin.setSpinnerString('|/-\\');
    spin.start();    
    s3.createBucket(params, function (err, data) {
        if (spin.isSpinning) {
            if (err) {
                if ((err.statusCode + "").substr(0, 1) === '4') {
                    console.log(err.message); // an error occurred                
                } else {
                    console.log(err, err.stack); // an error occurred
                }
            }
            else 
                console.log(`Access Location : ${data.Location} `);           // successful response
            
            spin.stop();
        }
    });
}

let listBuckets = () => {
    let spin = new Spinner('fetching list of bucket(s) ... ')
    spin.setSpinnerString('|/-\\');
    spin.start();
    
    s3.listBuckets((err, data) => {
        if (spin.isSpinning) {
            
            if (err) {
                if ((err.statusCode + "").substr(0, 1) === '4') {
                    console.log(err.message); // an error occurred                
                } else {
                    console.log(err, err.stack); // an error occurred
                }
            }   else    {
                let element = '\n';
                odata = data.Buckets
                odata.forEach(oBucket => {
                    if (oBucket.hasOwnProperty('Name')) {
                        element += '\t' + oBucket.Name + '\n';
                    }
                }); 
                console.log(element);
            }
            spin.stop();
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
    let spin = new Spinner('deleting bucket ... ')
    spin.setSpinnerString('|/-\\');
    spin.start();

    s3.deleteBucket(params, (err, data) => {
        if (spin.isSpinning) {
            if (err)    {
                if ((err.statusCode+"").substr(0, 1) === '4') {
                    console.log(err.message); // an error occurred                
                } else {
                    console.log(err, err.stack); // an error occurred
                }
            }
            else
                console.log(`Bucket deleted successfully. `);           // successful response
            spin.stop();
        }
    }) ;

}

// Function to upload the any kind of obejct to the S3 bucket. 
let uploadObject = (awsS3) => {
    let bucketName = awsS3.bucketName || '' ;
    let uploadFile = awsS3.uploadFile || '';

    if (bucketName === '') 
        return console.log(`Specify the bucket name.`);        
    if (uploadFile === '')
        return console.log(`Specify the upload file / object.`);        

    let params = {
        Bucket: bucketName,
        Key: '',
        Body: ''
    } ;

    // Stream the file
    let ofs = require('fs');
    let oFileStream = ofs.createReadStream(uploadFile) ;
    oFileStream.on('error', (err) => {
        return console.error(`Error while streaming the file object >> ${err} `);
    }) ;
    params.Body = oFileStream ;

    let oPath = require('path') ;
    params.Key = oPath.basename(uploadFile) ;
    console.log(`******************** Uploading Object ********************`);
    console.log(`Bucket : ${bucketName} `);
    console.log(`Object : ${uploadFile} `);
    console.log(`**********************************************************`);
    let spin = new Spinner('uploading object(s) to bucket ... ')
    spin.setSpinnerString('|/-\\');
    spin.start();

    s3.upload(params, (err, data) => {
        if (spin.isSpinning) {
            if (err)    {
                if (err.statusCode === 404) {
                    console.log(err.message); // an error occurred
                }   else    {
                    console.log(err, err.stack); // an error occurred
                }
            }
            else
                console.log(`Object uploaded successfully: ${data.Location} `);           // successful response

            spin.stop();            
        }
    });
    // Alternatively can be used
    // var params = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
    // s3.putObject(params, function (err, data) {
    //     if (err)
    //         console.log(err)
    //     else
    //         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    // });
}

// Function to list the objects on the specified bucket.
let listBucketObjects = (awsS3) => {
    let bucketName = awsS3.bucketName;
    let displayMetaData = awsS3.displayMetaData || false ;
    // let bucketRegion = awsS3.bucketRegion || _REGION;
    let params = {
        Bucket: bucketName
    };

    console.log(`******************** Listing Bucket Objects ********************`);
    console.log(`Bucket : ${bucketName} `);
    console.log(`*********************************************************`);
    var spin = new Spinner('fetching bucket objects .. ')
    spin.setSpinnerString('|/-\\');
    spin.start();
    s3.listObjectsV2(params, (err, data) => {
        if (spin.isSpinning) {
            if (err) {
                if (err.statusCode === 404) {
                    console.log(err.message); // an error occurred
                } else {
                    console.log(err, err.stack); // an error occurred
                }
            }
            else    {
                if (displayMetaData) {
                    console.log(` ${JSON.stringify(data, undefined, 2)} `);           // successful response                
                }   else    {
                    console.log(`Count : ${data.KeyCount} \n`);
                    // console.log(`# of Objects -> ${data} \n`);
                    let dataContents = data.Contents, listOfObjects = '';
                    dataContents.forEach(thisObject => {
                        if (thisObject.hasOwnProperty('Key')) {
                            listOfObjects += '\t' + thisObject.Key+'' + '\n';
                        }
                    })
                    console.log(listOfObjects);                
                }
            }
            spin.stop();
        }
    }) ;
}

// Export the modules 
module.exports = {
    createBucket,
    deleteOBucket,
    listBuckets,
    uploadObject,
    listBucketObjects
}