<?php

namespace AppBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * PictogrammeRepository.
 * Ensemble de requetes sur les pictogrammes
 */
class TestRepository extends EntityRepository
{

    /**
     * @param Discipline $discipline
     * @param $filename
     * @return Test | null
     * Returns the test associated to filename among the tests of discipline if it exists.
     * returns null otherwise.
     */
    public function getOneByDisciplineFile(Discipline $discipline, $filename){
        $qb = $this->_em->createQueryBuilder();
        $query = $qb->select('t')->from('AppBundle:Test', 't')
            ->where('t.gitPath = :filename')
            ->setParameter('filename',$filename)
            ->leftJoin('t.session', 'session')
            ->addSelect('session')
            ->andWhere('session.discipline = :discipline')
            ->setParameter('discipline', $discipline)
            ->getQuery();

        return $query->getOneOrNullResult();
    }

}