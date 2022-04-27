import request from './request';

export const getEvents = data => async (dispatch) => {
    try {
        const response = await request({
            route: 'calendars/devcalledjulius@gmail.com/events',
            method: 'get',
        });
        return response.data
    } catch (err) {
        console.log("....", err);
        
    }
}