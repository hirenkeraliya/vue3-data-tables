<template>
    <div>
        <div>
            <select
                v-if="allowPagination && records.length !== 0"
                class="w-20 form-select box mt-3 sm:mt-0 mr-auto"
                :value="state.perPage"
                @input="updatePerPage"
            >
                <option
                    v-for="perPageRecordLimit in perPageRecordLimits"
                    :key="'per-page-record-limit-' + perPageRecordLimit"
                    :value="perPageRecordLimit"
                >
                    {{ perPageRecordLimit }}
                </option>
            </select>
        </div>

        <div>
            <slot name="extra-header-details" />
        </div>
    </div>

    <table :class="tableClasses">
        <TableHeader
            :columns="columns"
            :sort-direction="state.sortDirection"
            :sort-by="state.sortBy"
            :table-header-classes="tableHeaderClasses"
            @update:sort-by="sortRecords"

        ></TableHeader>

        <TableBody
            :columns="columns"
            :records="records"
            :per-page="state.perPage"
            :current-page="state.currentPage"
            :sort-direction="state.sortDirection"
            :sort-by="state.sortBy"
            :table-body-classes="tableBodyClasses"
            :body-row-classes="bodyRowClasses"
            :no-data-message="noDataMessage"
            :allow-pagination="allowPagination"
        ></TableBody>
    </table>
</template>

<script setup>
    import TableHeader from "./partials/TableHeader.vue";
    import TableBody from "./partials/TableBody.vue";
import { reactive } from "vue";

    const props = defineProps({
        records: {
            type: Array,
            required: true,
        },

        columns: {
            type: Array,
            required: true,
        },

        perPageRecordLimits: {
            type: Array,
            default: [10, 25, 50, 100]
        },

        tableClasses: {
            type: String,
            default: 'table-auto'
        },

        tableHeaderClasses: {
            type: String,
            default: ''
        },

        tableBodyClasses: {
            type: String,
            default: ''
        },

        bodyRowClasses: {
            type: String,
            default: ''
        },

        noDataMessage: {
            type: String,
            default: 'There are no records to show.'
        },

        allowPagination: {
            type: Boolean,
            default: true
        },
    });

    const state = reactive({
        perPage: 10,
        currentPage: 1,

        sortBy: 'id',
        sortDirection: 'desc',
    });

    const updatePerPage = (event) => {
        state.perPage = parseInt(event.target.value);
        resetCurrentPage();
    };

    const resetCurrentPage = () => {
        state.currentPage = 1;
    };

    const sortRecords = (columnKey) => {
        state.sortBy = columnKey;
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    };

</script>
