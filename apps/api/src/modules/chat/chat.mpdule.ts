import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat-test.getway";
import { SignalingGateway } from "./signaling.gateway";

@Module({
    // imports: [TypeOrmModule.forFeature([Chat])],
    imports: [ChatGateway, SignalingGateway],
    providers: [ChatGateway, SignalingGateway],
    exports: [],
})
export class ChatModule {}

