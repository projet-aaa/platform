<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * TextAnswerRepository.
 * Set of request on TextAnswer
 */
class TextAnswerRepository extends EntityRepository
{

    /**
     * counts the number of mcqanswer for a given author and a given question.
     * Used to validate an new mcqanswer.
     * @returns int the number of matching mcqanswer
     */
    public function isValidAuthorQuestion(User $author, Question $question){
        $qb = $this->_em->createQueryBuilder();
        $query = $qb->select('count(t)')->from('AppBundle:TextAnswer', 't')
            ->where('t.author = :author')
            ->setParameter('author',$author)
            ->andWhere('t.question = :question')
            ->setParameter('question', $question)
            ->getQuery();

        return $query->getSingleScalarResult();
    }

}