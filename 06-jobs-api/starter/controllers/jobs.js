const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

//authentication is handled by middleware.
    //the middleware placed {userId, name} in req.user

/*
postman authorization bearer token automation setting:
register & login: 
    Tests -> 
        const jsonData = pm.response.json();
        pm.globals.set("accessToken", jsonData.token);
Other endpoints:
    Authorization -> Bearer Token
*/

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req, res) => {

    //get user id and job id from req: 
    const {
        user: {userId}, 
        params:{id: jobId}
    } = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })

    if (!job) {
        throw new NotFoundError(`No job with ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})

}

const createJob = async (req, res) => {

    req.body.createdBy = req.user.userId //create createdBy property on req.body
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    //get user id and job id from req: 
    const {
        body: {company, position},
        user: {userId}, 
        params:{id: jobId}
    } = req

    if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
    }

    const job = await Job.findByIdAndUpdate({_id: jobId, createdBy: userId}, req.body, {new: true, runValidators: true })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({jobId})
}

const deleteJob = async (req, res) => {
    const {
        user: {userId},
        params: {id: jobId},
    } = req

    const job = await Job.findOneAndRemove({
        _id: jobId,
        createdBy: userId
    })

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}