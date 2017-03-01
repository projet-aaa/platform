<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * McqAnswerRepository.
 * Set of request on McqAnswer
 */
class McqAnswerRepository extends EntityRepository
{

    /**
     * counts the number of mcqanswer for a given author and a given question.
     * Used to validate an new mcqanswer.
     * @returns int the number of matching mcqanswer
     */
    public function isValidAuthorQuestion(User $author, Question $question){
        $qb = $this->_em->createQueryBuilder();
        $query = $qb->select('count(m)')->from('AppBundle:McqAnswer', 'm')
            ->where('m.author = :author')
            ->setParameter('author',$author)
            ->andWhere('m.question = :question')
            ->setParameter('question', $question)
            ->getQuery();

        return $query->getSingleScalarResult();
    }

}