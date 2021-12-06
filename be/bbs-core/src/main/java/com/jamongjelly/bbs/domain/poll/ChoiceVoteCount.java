package com.jamongjelly.bbs.domain.poll;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ChoiceVoteCount {

    private Long choiceId;
    private Long voteCount;

    @Builder
    public ChoiceVoteCount(Long choiceId, Long voteCount) {
        this.choiceId = choiceId;
        this.voteCount = voteCount;
    }

}
