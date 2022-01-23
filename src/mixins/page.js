import { getPage } from '../services/lines'

export default {
    methods: {
        nextPage() {
            if (!this.next) {
                return
            }
            getPage(this.next).then((res) => {
                this.saveData(res)
            });
        },
        previousPage() {
            if (!this.prev) {
                return
            }
            getPage(this.prev).then((res) => {
                this.saveData(res)
            });
        },
        saveData(res) {
            this.line = res.data.result.records;
            this.next = res.data.result._links.next;
            if (res.data.result._links.prev) {
                this.prev = res.data.result._links.prev;
            }
        }
    }
}