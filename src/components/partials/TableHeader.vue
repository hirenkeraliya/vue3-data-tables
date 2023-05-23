<template>
    <thead :class="tableHeaderClasses">
        <tr>
            <th
                v-for="column in columns"
                :key="'table-header-' + column.key"
                :class="column.headerClass ?? 'text-center whitespace-nowrap'"
            >
                <div
                    :class="column.sortable ? 'flex cursor-pointer' : ''"
                    @click="column.sortable ? sortRecords(column) : ''"
                >
                    <div :class="column.sortable ? 'text-left mr-auto inline-block' : ''">
                        {{ prepareColumnLabel(column) }}
                    </div>

                    <div
                        v-if="column.sortable"
                        class="text-right ml-auto inline-block"
                        :class="column.key === sortBy ? 'text-gray-900' : 'text-gray-400'"
                    >
                        <div v-if="sortDirection === 'asc' && column.key === sortBy">
                            <slot name="sort-asc-icon">
                                <ChevronUp
                                    class="w-4 h-4"
                                />
                            </slot>
                        </div>

                        <div v-else>
                            <slot name="sort-desc-icon">
                                <ChevronDown
                                    class="w-4 h-4"
                                />
                            </slot>
                        </div>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
</template>

<script setup>
    const props = defineProps({
        columns: {
            type: Array,
            required: true,
        },

        tableHeaderClasses: {
            type: string,
            required: true,
        },

        sortDirection: {
            type: string,
            required: true,
        },

        sortBy: {
            type: string,
            required: true,
        },
    });

    const emits = defineEmits([
        'update:sort-attribute',
    ]);

    const prepareColumnLabel = (column) => {
        if (column.label) {
            return column.label;
        }

        return column.key.split('_')
            .map((word) => {
                return word[0].toUpperCase() + word.substr(1).toLowerCase();
            }).join(' ');
    };

    const sortRecords = (column) => {
        emits('update:sort-attribute', column.key);
    };
</script>
