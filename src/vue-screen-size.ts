import Vue from 'vue'

import { Component } from 'vue-property-decorator'

class VCSInternalReactiveComponent extends Vue {
    public event: UIEvent = null;
    public vssWidth: number = 0;
    public vssHeight: number = 0;
}

const reactiveComponent = new VCSInternalReactiveComponent();

@Component
class VueScreenSizeMixin extends Vue {
    get $vssEvent() {
        return reactiveComponent.event;
    }

    get $vssWidth(): number {
        return reactiveComponent.vssWidth;
    }

    get $vssHeight(): number {
        return reactiveComponent.vssHeight;
    }

    getScreenWidth(): number {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth
    }

    getScreenHeight() {
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight
    }

    handleResize(event: UIEvent) {
        reactiveComponent.event = event;
        reactiveComponent.vssWidth = this.getScreenWidth();
        reactiveComponent.vssHeight = this.getScreenHeight();
    }

    $vssDestroyListener() {
        window.removeEventListener('resize', this.handleResize)
    }

    mounted() {
        window.addEventListener('resize', this.handleResize)
    }

    destroyed() {
        this.$vssDestroyListener();
    }
}

export default VueScreenSizeMixin;
