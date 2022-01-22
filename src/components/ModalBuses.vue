<template>
    <div class="modal fade" id="busesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Linhas de Ônibus</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input v-model="search" class="form-control mb-3" list="datalistOptions" id="exampleDataList" placeholder="Pesquise pelo nome">
                <datalist id="datalistOptions">

                </datalist>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nome </th>
                            <th scope="col">Linha</th>
                            <th scope="col">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="bus in filteredBuses" :key="bus._id">
                            <td><a @click="goToMaps(bus.nome)" type="button">{{ bus.nome }}</a></td>
                            <td>{{ bus.linha }}</td>
                            <td>{{ bus.tipo }}</td>
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="...">
                    <ul class="pagination justify-content-between">
                        <li class="page-item">
                            <button type="button" class="btn btn-primary" @click="previousPage()">Anterior</button>
                        </li>
                        <li class="page-item">
                            <button type="button" class="btn btn-primary" @click="nextPage()">Próximo</button>
                        </li>
                    </ul>
                </nav>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFirstPage, getPage } from '../services/bus'

export default {
    name: 'ModalBuses',
    data() {
        return {
            buses: [],
            search: '',
            next: '',
            prev: '',
        }
    },
    computed: {
        filteredBuses() {
            return this.buses.filter((bus) => {
                return bus.nome.match(this.search.toUpperCase())
            })
        },
    },
    methods: {
        nextPage() {
            getPage(this.next).then((res) => {
                this.buses = res.data.result.records
                this.next = res.data.result._links.next
                if (res.data.result._links.prev) {
                    this.prev = res.data.result._links.prev
                }
            })
        },
        previousPage() {
            getPage(this.prev).then((res) => {
                this.buses = res.data.result.records
                this.next = res.data.result._links.next
                if (res.data.result._links.prev) {
                    this.prev = res.data.result._links.prev
                }
            })
        },
        goToMaps(name) {
            window.location.href = `https://www.google.com.br/maps/search/${name.toLowerCase()}`
        }
    },
    created() {
        getFirstPage().then((res) => {
            this.buses = res.data.result.records
            this.next = res.data.result._links.next
        })
    }
}
</script>