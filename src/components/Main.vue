<template>
    <div class="container col-xxl-8 px-4 py-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6 ">
                <img src="@/assets/transporte-publico.png" class="d-block mx-lg-auto img-fluid" alt="Transporte Público" width="400" height="200" loading="lazy">
            </div>
            <div class="col-lg-6">
                <h1 class="display-5 fw-bold lh-1 mb-3">Encontre sua linha de ônibus ou lotação</h1>
                <p class="lead">
                    Encontre rapidamente a linha de ônibus ou lotação desejada na cidade de Porto Alegre-RS com apenas alguns cliques.
                    Gostaria de obter mais informações? Ligue: (54)98400-0540
                </p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button data-bs-toggle="modal" data-bs-target="#busesModal" type="button" class="btn btn-primary btn-lg px-4 me-md-2">Onibus</button>
                <p>OU</p>
                <button data-bs-toggle="modal" data-bs-target="#allotmentsModal" type="button" class="btn btn-outline-secondary btn-lg px-4">Lotação</button>
                </div>
            </div>
            <ModalBuses />
            <ModalAllotments />
        </div>
    </div>
</template>

<script>
import ModalBuses from './ModalBuses.vue'
import ModalAllotments from './ModalAllotments.vue'

export default {
    name: 'Main',
    components: {
        ModalBuses,
        ModalAllotments
    }
}
</script>