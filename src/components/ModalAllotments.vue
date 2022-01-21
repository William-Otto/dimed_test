<template>
    <div class="modal fade" id="allotmentsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Linhas de Lotação</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input v-model="search" class="form-control mb-3" list="datalistOptions" id="exampleDataList" placeholder="Pesquise pelo sentido">
                <datalist id="datalistOptions">

                </datalist>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sentido</th>
                            <th scope="col">Linha</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Adaptado p/ Deficiênte</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="allotment in filteredAllotments" :key="allotment._id">
                            <td>{{ allotment.sentido }}</td>
                            <td>{{ allotment.linha }}</td>
                            <td>{{ allotment.horario_largada }}</td>
                            <td>{{ allotment.adaptado_deficiente }}</td>
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="...">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" @click="previousPage()">Previous</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" @click="nextPage()">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFirstPage, getPage } from '../services/allotment'

export default {
    name: 'ModalAllotments',
    data() {
        return {
            allotments: [],
            search: '',
            next: '',
            prev: '',
        }
    },
    computed: {
        filteredAllotments() {
            return this.allotments.filter((allotment) => {
                return allotment.sentido.match(this.search.toUpperCase())
            })
        },
    },
    methods: {
        nextPage() {
            getPage(this.next).then((res) => {
                this.allotments = res.data.result.records
                this.next = res.data.result._links.next
                if (res.data.result._links.prev) {
                    this.prev = res.data.result._links.prev
                }
            })
        },
        previousPage() {
            getPage(this.prev).then((res) => {
                this.allotments = res.data.result.records
                this.next = res.data.result._links.next
                if (res.data.result._links.prev) {
                    this.prev = res.data.result._links.prev
                }
            })
        },
    },
    created() {
        getFirstPage().then((res) => {
            this.allotments = res.data.result.records
            this.next = res.data.result._links.next
        })
    }
}
</script>