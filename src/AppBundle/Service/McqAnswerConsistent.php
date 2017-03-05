<?php
/**
 * Created by PhpStorm.
 * User: stoakes
 * Date: 01/03/17
 * Time: 07:47
 */

namespace AppBundle\Service;


use AppBundle\AppBundle;
use AppBundle\Entity\McqAnswer;
use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class McqAnswerConsistent extends Constraint
{
    public $message = 'A question of type %type% can\'t have %number% answers from the same author. (%expected% expected)';

    public function validatedBy()
    {
        return McqAnswerValidator::class;
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}