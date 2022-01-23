import { getPage } from '../services/lines'

export default {
    methods: {
        nextPage() {
            this.loading = true
            getPage(this.next).then((res) => {
                this.saveData(res)
                this.loading = false
            });
        },
        previousPage() {
            this.loading = true
            getPage(this.prev).then((res) => {
                this.saveData(res)
                this.loading = false
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