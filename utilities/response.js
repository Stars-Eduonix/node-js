
const apiResponse = (res, status, success, message, data, error) => {
    return res.status(status).json({success, message, data, error });
}

export default apiResponse;