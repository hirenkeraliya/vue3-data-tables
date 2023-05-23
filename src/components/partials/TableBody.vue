<template>
    <tbody :class="tableBodyClasses" v-if="records.length === 0">
        <tr
            class="intro-x"
        >
            <td
                :colspan="columns.length"
                class="w-40 text-center"
            >
                {{ noDataMessage }}
            </td>
        </tr>
    </tbody>

    <tbody :class="tableBodyClasses" v-else>
        <tr
            v-for="(record, index) in filteredRecords"
            :key="'table-row-' + index"
            :class="bodyRowClasses"
        >
            <td
                v-for="(column, index) in columns"
                :key="'table-row-column-' + column.key + '-' + index"
                :class="column.rowClass ?? ''"
            >
                <slot
                    :name="`${column.key}`"
                    :item="record"
                    :index="currentPage === 1 ?
                        index :
                        (index + (perPage * (currentPage - 1)))"
                >
                    <span v-if="column.iteration">
                        {{ getIterationNumber(index + 1) }}
                    </span>

                    <span v-else>
                        {{ record[column.key] }}
                    </span>
                </slot>
            </td>
        </tr>
    </tbody>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        columns: {
            type: Array,
            required: true
        },

        records: {
            type: Array,
            required: true
        },

        currentPage: {
            type: Number,
            required: true
        },

        perPage: {
            type: Number,
            required: true
        },

        sortDirection: {
            type: String,
            required: true
        },

        sortBy: {
            type: String,
            required: true
        },

        allowPagination: {
            type: Boolean,
            required: true
        },

        noDataMessage: {
            type: String,
            required: true
        },

        tableBodyClasses: {
            type: String,
            required: true
        },

        bodyRowClasses: {
            type: String,
            required: true
        },
    });

    const filteredRecords = computed(() => {
        let records = props.records;

        records = applySortingOnRecords(records);

        if (props.allowPagination) {
            const startRecordNumber = (props.currentPage * props.perPage) - props.perPage;
            return records.slice(startRecordNumber, props.currentPage * props.perPage);
        }

        return records;
    });

    const applySortingOnRecords = (records) => {
        if (!props.sortBy || !props.sortDirection) {
            return records;
        }

        return records.sort((firstRecord, secondRecord) => {
            let comparison = 0;

            if (
                Object.prototype.hasOwnProperty.call(firstRecord, props.sortBy) &&
                firstRecord[props.sortBy] < secondRecord[props.sortBy]
            ) {
                comparison = -1;
            }

            if (
                Object.prototype.hasOwnProperty.call(firstRecord, props.sortBy) &&
                firstRecord[props.sortBy] > secondRecord[props.sortBy]
            ) {
                comparison = 1;
            }

            return props.sortDirection === 'desc' ? (comparison * -1) : comparison;
        });
    };

    const getIterationNumber = (index) => {
        return index + (state.perPage * (state.currentPage - 1));
    };
</script>
