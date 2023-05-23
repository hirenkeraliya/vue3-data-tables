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

    <tbody :class="tableBodyClasses" v-if="records.length === 0">
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
            type: Array,
            required: true
        },

        perPage: {
            type: Array,
            required: true
        },

        sortDirection: {
            type: String,
            required: true
        },

        sortAttribute: {
            type: String,
            required: true
        },

        allowPagination: {
            type: Boolean,
            required: true
        },

        noDataMessage: {
            type: string,
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
        if (!props.sortAttribute || !props.sortDirection) {
            return records;
        }

        return records.sort((firstRecord, secondRecord) => {
            let comparison = 0;

            if (
                Object.prototype.hasOwnProperty.call(firstRecord, props.sortAttribute) &&
                firstRecord[props.sortAttribute] < secondRecord[props.sortAttribute]
            ) {
                comparison = -1;
            }

            if (
                Object.prototype.hasOwnProperty.call(firstRecord, props.sortAttribute) &&
                firstRecord[props.sortAttribute] > secondRecord[props.sortAttribute]
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
