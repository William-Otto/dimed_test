<template>
  <div
    class="modal fade"
    id="busesModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Linhas de Ônibus</h5>
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
            placeholder="Pesquise pelo nome"
          />
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
            <symbol
              id="check-circle-fill"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </symbol>
            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
              <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
              />
            </symbol>
            <symbol
              id="exclamation-triangle-fill"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </symbol>
          </svg>

          <div
            class="alert alert-primary d-flex align-items-center"
            role="alert"
          >
            <svg
              class="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Info:"
            >
              <use xlink:href="#info-fill" />
            </svg>
            <div>
              Clique sob o nome de uma linha para saber a localização no Google
              Maps
            </div>
          </div>
          <div class="d-grid gap-2">
            <button
              class="btn btn-outline-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#allotmentsModal"
            >
              Visualizar Linhas de Lotação
            </button>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Linha</th>
                <th scope="col">Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bus in filteredBuses" :key="bus._id">
                <td>
                  <a
                    v-if="bus.nome"
                    @click="goToMaps(bus.nome)"
                    type="button"
                    >{{ bus.nome }}</a
                  >
                  <a v-else class="text-danger">Nome não disponibilizado</a>
                </td>
                <td v-if="bus.linha">{{ bus.linha }}</td>
                <td v-else class="text-danger">Linha não disponibilizada</td>
                <td v-if="bus.tipo">{{ bus.tipo }}</td>
                <td v-else class="text-danger">Tipo não disponibilizado</td>
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
import { getLinesBuses } from "../services/lines";
import page from "../mixins/page";

export default {
  name: "ModalBuses",
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
    filteredBuses() {
      return this.line.filter((bus) => {
        return bus.nome.match(this.search.toUpperCase());
      });
    },
  },
  methods: {
    goToMaps(name) {
      window
        .open(`https://www.google.com.br/maps/search/${name.toLowerCase()}`)
        .focus();
    },
  },
  created() {
    getLinesBuses().then((res) => {
      this.line = res.data.result.records;
      this.next = res.data.result._links.next;
    });
  },
};
</script>