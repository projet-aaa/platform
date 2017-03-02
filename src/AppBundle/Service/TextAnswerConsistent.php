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
class TextAnswerConsistent extends Constraint
{
    public $message = 'This author already has an answer for that question';

    public function validatedBy()
    {
        return TextAnswerValidator::class;
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}