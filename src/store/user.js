import {defineStore} from "pinia";
import {darkTheme} from "naive-ui";


export const useUserStore = defineStore('user', {
    state: () => ({
        theme: getSavedTheme()
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme == null ? darkTheme : null;
            // console.log('theme:', this.theme); // 用于调试
            localStorage.setItem("theme", JSON.stringify(this.theme)); // 添加localStorage
            // console.log('localStorage:', localStorage.getItem("theme")); // 用于调试
        },
        setTheme() {
            const theme = JSON.parse(localStorage.getItem("theme"));
            if (theme != null) {
                this.theme = theme;
            }
        }
    }
})
function getSavedTheme() {
    // console.log('localStorage:', localStorage.getItem("theme")); // 用于调试
    return JSON.parse(localStorage.getItem("theme"));
}




