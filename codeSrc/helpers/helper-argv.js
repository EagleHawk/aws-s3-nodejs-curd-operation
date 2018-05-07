/*
 * Created by : Devendra Walanj
 * Purpose : File give a structured place to add help without changing the main file. 
**/

const yargs = require('yargs');
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
const helper_argv = yargs
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

module.exports = {
    helper_argv
    
}    