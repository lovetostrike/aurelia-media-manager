import { ConfigService } from '../../services/config-service';
export declare class DragAndDrop {
    private configService;
    private fileTypes;
    private abort;
    private multiple;
    private id;
    private uploads;
    constructor(configService: ConfigService);
    handleInputChange: (event: Event) => void;
    handleDrop: (event: DragEvent) => void;
    handleUploadProgress: (event: any, fileIndex: number) => void;
    handleLoadComplete: (event: Event, fileIndex: number) => void;
    handleAbort: (event: Event, fileIndex: number) => void;
    abortUpload(fileIndex: number): void;
    private updateUploadProgress(index, percentage);
    private uploadFiles(files);
}
