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
          <table class="table table-striped">
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
                <td v-if="allotment.sentido">{{ allotment.sentido }}</td>
                <td v-else class="text-danger">Sentido não disponibilizado</td>
                <td v-if="allotment.linha">{{ allotment.linha }}</td>
                <td v-else class="text-danger">Linha não disponibilizada</td>
                <td v-if="allotment.horario_largada">
                  {{ allotment.horario_largada }}
                </td>
                <td v-else class="text-danger">Saída não disponibilizada</td>
                <td v-if="allotment.adaptado_deficiente">
                  {{ allotment.adaptado_deficiente }}
                </td>
                <td v-else class="text-danger">
                  Informação não disponibilizada
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="...">
            <ul class="pagination justify-content-between">
              <li class="page-item">
                <button
                  v-if="loading == false"
                  type="button"
                  class="btn btn-primary"
                  @click="previousPage()"
                  :disabled="prev == ''"
                >
                  Anterior
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Loading...</span>
                </button>
              </li>
              <li class="page-item">
                <button
                  v-if="loading == false"
                  type="button"
                  class="btn btn-primary"
                  @click="nextPage()"
                  :disabled="next == ''"
                >
                  Próximo
                </button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Loading...</span>
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
      loading: false,
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