import { Event } from 'apps/event/src/event.schema';
import { EventRewardClaim } from 'apps/event/src/reward/reward.schema';
import { EventDto } from 'lib/dto/event.dto';
import { EventRewardClaimDto } from 'lib/dto/reward.dto';

export function convertEventDocumentToDto(eventDocument: Event): EventDto {
  return {
    id: eventDocument._id,
    description: eventDocument.description,
    condition: eventDocument.condition,
    createdAt: eventDocument.createdAt,
    endAt: eventDocument.endAt,
    isEnabled: eventDocument.isEnabled,
    rewards: eventDocument.rewards,
  };
}

export function convertEventRewardClaimDocumentToDto(
  eventRewardClaim: EventRewardClaim,
): EventRewardClaimDto {
  return {
    userId: eventRewardClaim.user._id.toString(),
    eventId: eventRewardClaim.event._id.toString(),
    status: eventRewardClaim.status,
  };
}
