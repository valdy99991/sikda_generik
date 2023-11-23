import moment from 'moment';

const Formatter = {
    formatDate (date: Date) {
        return moment(date).format("DD-MMM-YYYY HH:mm:ss");
    }
}

export default Formatter