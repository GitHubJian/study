class State {
    constructor() {
        if (new.target == State) {
            throw new Error('不能被实例化');
        }
    }
    download() {
        throw new Error('该方法必须被重载');
    }
    pause() {
        throw new Error('该方法必须被重载');
    }
    finish() {
        throw new Error('该方法必须被重载');
    }
}
//开始下载
class ReadyState extends State {
    constructor(oDownload) {
        super();
        this.oDownload = oDownload;
    }
    download() {
        this.oDownload.setState(this.oDownload.getDownloadingState());
        console.log('开始下载!');
    }
    pause() {
        throw new Error('还没开始下载，不能暂停!');
    }
    finish() {
        throw new Error('文件还没开始下载，当然也不能结束了!');
    }
}
//正在下载的状态
class DownloadingState extends State {
    constructor(oDownload) {
        super();
        this.oDownload = oDownload;
    }
    download() {
        throw new Error('文件已经正在下载中了!');
    }
    pause() {
        this.oDownload.setState(this.oDownload.getDownloadPausedState());
        console.log('暂停下载!');
    }
    finish() {
        this.oDownload.setState(this.oDownload.getDownloadedState());
        console.log('下载完毕!');
    }
}
//下载暂停的状态
class DownloadPausedState extends State {
    constructor(oDownload) {
        super();
        this.oDownload = oDownload;
    }
    download() {
        this.oDownload.setState(this.oDownload.getDownloadingState());
        console.log('继续下载!');
    }
    pause() {
        throw new Error('已经暂停了，咋还要暂停呢!');
    }
    finish() {
        this.oDownload.setState(this.oDownload.getDownloadedState());
        console.log('下载完毕!');
    }
}
//下载完成的状态
class DownloadedState extends State {
    constructor(oDownload) {
        super();
        this.oDownload = oDownload;
    }
    download() {
        this.oDownload.setState(this.oDownload.getDownloadingState());
        console.log('重新下载!');
    }
    pause() {
        throw new Error('对下载完了，还暂停啥？');
    }
    finish() {
        throw new Error('下载成功了，不能再为成功了吧!');
    }
}

class Download {
    constructor() {
        this.oState = new ReadyState(this);
    }

    setState(oState) {
        this.oState = oState;
    }

    download() {
        this.oState.download();
    }

    pause() {
        this.oState.pause();
    }

    finish() {
        this.oState.finish();
    }

    getReadyState() {
        return new ReadyState(this);
    }

    getDownloadingState() {
        return new DownloadingState(this);
    }

    getDownloadPausedState() {
        return new DownloadPausedState(this);
    }

    getDownloadedState() {
        return new DownloadedState(this);
    }
}

let download = new Download();
download.download();
download.pause();
download.finish();
