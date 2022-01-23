<template>
  <div
    class="modal fade"
    id="allotmentsModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Linhas de Lotação</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            v-model="search"
            class="form-control mb-3"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Pesquise pelo sentido"
          />
          <datalist id="datalistOptions"> </datalist>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Sentido</th>
                <th scope="col">Linha</th>
                <th scope="col">Saída</th>
                <th scope="col">Adaptado p/ Deficiente</th>
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
            <ul class="pagination justify-content-between">
              <li class="page-item">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="previousPage()"
                >
                  Anterior
                </button>
              </li>
              <li class="page-item">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nextPage()"
                >
                  Próximo
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLinesAllotments } from "../services/lines";
import page from "../mixins/page";

export default {
  name: "ModalAllotments",
  mixins: [page],
  data() {
    return {
      line: [],
      search: "",
      next: "",
      prev: "",
    };
  },
  computed: {
    filteredAllotments() {
      return this.line.filter((allotment) => {
        return allotment.sentido.match(this.search.toUpperCase());
      });
    },
  },
  created() {
    getLinesAllotments().then((res) => {
      this.line = res.data.result.records;
      this.next = res.data.result._links.next;
    });
  },
};
</script>