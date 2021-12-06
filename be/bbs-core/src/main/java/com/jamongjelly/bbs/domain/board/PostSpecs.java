package com.jamongjelly.bbs.domain.board;

import lombok.Getter;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PostSpecs {

    @Getter
    public enum SearchKey {
        ALL("all")
        , TITLE("title")
        , WRITER("writer")
        , CONTENT("content")
        ;

        private final String value;

        SearchKey(String value) {
            this.value = value;
        }
    }

    public static Specification<Post> searchWith(SearchKey searchKey, String keyword) {
        return (Specification<Post>) ((root, query, builder) ->
                builder.like(root.get(searchKey.getValue()), "%" + keyword + "%")
        );
    }

    public static Specification<Post> searchWith(Map<SearchKey, Object> searchKeyword) {
        return (Specification<Post>) ((root, query, builder) -> {
            List<Predicate> predicates = getPredicateWithKeyword(searchKeyword, root, builder);
            return builder.or(predicates.toArray(new Predicate[0]));
        });
    }

    public static Specification<Post> searchWith(Map<SearchKey, Object> searchKeyword, Long boardId) {
        return (Specification<Post>) ((root, query, builder) -> {
            List<Predicate> predicates = getPredicateWithKeyword(searchKeyword, root, builder);
            return builder.and(
                    builder.equal(root.get("board").get("id"), boardId),
                    builder.or(predicates.toArray(new Predicate[0]))
            );
        });
    }

    public static Specification<Post> searchWithSubjectId(Long subjectId) {
        return (Specification<Post>) (
                (root, query, builder) -> builder.and(builder.equal(root.get("subject").get("id"), subjectId))
        );
    }

    private static List<Predicate> getPredicateWithKeyword(
            Map<SearchKey, Object> searchKeyword, Root<Post> root, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();
        for (SearchKey key : searchKeyword.keySet()) {
            switch (key) {
                case TITLE:
                case CONTENT:
                    predicates.add(builder.like(
                            root.get(key.getValue()), "%" + searchKeyword.get(key) + "%"
                    ));
                    break;
                case WRITER:
                    predicates.add(builder.equal(
                            root.get(key.getValue()), searchKeyword.get(key)
                    ));
                    break;
                case ALL:
                    predicates.add(builder.like(
                            root.get(SearchKey.TITLE.getValue()), "%" + searchKeyword.get(key) + "%"
                    ));
                    predicates.add(builder.like(
                            root.get(SearchKey.CONTENT.getValue()), "%" + searchKeyword.get(key) + "%"
                    ));
                    predicates.add(builder.equal(
                            root.get(SearchKey.WRITER.getValue()), searchKeyword.get(key)
                    ));
                    break;
            }
        }

        return predicates;
    }
}
