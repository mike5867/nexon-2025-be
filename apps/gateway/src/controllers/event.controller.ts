import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'lib/decorators/roles.decorator';
import { UserRole } from 'lib/dto/user.dto';
import { AuthenticatedRequest } from 'lib/interfaces/auth.interface';
import {
  CreateEventRequest,
  CreateEventResponse,
  GetEventByIdResponse,
  GetEventsResponse,
} from 'lib/interfaces/event.interface';
import {
  AddRewardToEventRequest,
  ClaimEventRewardResponse,
  GetEventRewardClaimsResponse,
} from 'lib/interfaces/reward.interface';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { EventClient } from '../clients/event.client';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventClient: EventClient) {}

  @Post()
  @Roles(UserRole.Admin, UserRole.Operator)
  async createEvent(
    @Body() body: CreateEventRequest,
  ): Promise<CreateEventResponse> {
    return this.eventClient.createEvent(body);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Operator)
  async getEvents(): Promise<GetEventsResponse> {
    return this.eventClient.getEvents({});
  }

  @Get(':eventId')
  @Roles(UserRole.Admin, UserRole.Operator)
  async getEventById(
    @Param('eventId') eventId: string,
  ): Promise<GetEventByIdResponse> {
    const {
      events: [event],
    } = await this.eventClient.getEvents({ eventIds: [eventId] });

    return { event };
  }

  @Post(':eventId/rewards')
  @Roles(UserRole.Admin, UserRole.Operator)
  async addEventReward(
    @Param('eventId') eventId: string,
    @Body() body: AddRewardToEventRequest,
  ): Promise<GetEventByIdResponse> {
    return this.eventClient.addEventReward({ eventId, reward: body.reward });
  }

  @Post('/:eventId/claim')
  @Roles(UserRole.Admin, UserRole.User)
  async claimEventReward(
    @Req() req: AuthenticatedRequest,
    @Param('eventId') eventId: string,
  ): Promise<ClaimEventRewardResponse> {
    return this.eventClient.claimEventReward({
      eventId,
      userId: req.user?.id || '',
    });
  }

  @Get('claims')
  @Roles(UserRole.Admin, UserRole.Auditor)
  async getEventRewardClaims(): Promise<GetEventRewardClaimsResponse> {
    return this.eventClient.getEventRewardClaims({});
  }

  @Get('claims/my')
  @Roles(UserRole.Admin, UserRole.User)
  async getMyEventRewardClaims(
    @Req() req: AuthenticatedRequest,
  ): Promise<GetEventRewardClaimsResponse> {
    return this.eventClient.getEventRewardClaims({ userId: req.user?.id });
  }
}
