import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException
} from '@nestjs/common'
import { CreateMessageDto } from './dtos/create.message.dto'
import { MessagesService } from './messages.service'

@Controller('/messages')
export class MessagesController {
  messagesServ: MessagesService

  constructor() {
    this.messagesServ = new MessagesService()
  }

  @Get()
  listMessages() {
    return this.messagesServ.findAll()
  }

  @Post()
  createMessages(@Body() body: CreateMessageDto) {
    return this.messagesServ.create(body.content)
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesServ.findOne(id)

    if (!message) throw new NotFoundException('message not found')

    return message
  }
}
