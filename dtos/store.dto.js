// dtos/mission.dto.js

export class StoreMissionDTO {
    constructor(missionId, title, description, status) {
        this.missionId = missionId;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
