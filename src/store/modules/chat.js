export const moduleChat = {
    state: () => ({
        dialogs: [],
        selectTargetUser: "everyone",
    }),
    mutations: {
        updateDialogs(state, payload) {
            state.dialogs.push(payload);
        },
        selectTargetUser(state, payload) {
            state.selectTargetUser = payload;
        },
    },
    actions: {},
    getters: {},
};