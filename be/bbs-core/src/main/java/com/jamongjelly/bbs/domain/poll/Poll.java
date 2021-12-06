package com.jamongjelly.bbs.domain.poll;

import com.jamongjelly.bbs.constants.Constraints;
import com.jamongjelly.bbs.domain.UserDateAudit;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "polls")
@Getter
@ToString
public class Poll extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = Constraints.POLL_QUESTION_MAX_LENGTH)
    private String question;

    @NotNull
    private Instant expiredAt;

    @OneToMany(
            mappedBy = "poll",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    @Size(min = Constraints.POLL_CHOICES_MIN_LENGTH, max = Constraints.POLL_QUESTION_MAX_LENGTH)
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 30)
    private List<Choice> choices = new ArrayList<>();

    public Poll() { }

    @Builder
    public Poll(String question, Instant expiredAt) {
        this.question = question;
        this.expiredAt = expiredAt;
    }

    public void addChoice(Choice choice) {
        choices.add(choice);
    }

    public void removeChoice(Choice choice) {
        choices.remove(choice);
    }
}
