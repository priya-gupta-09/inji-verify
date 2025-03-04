package io.inji.verify.controller;

import io.inji.verify.dto.presentation.VPDefinitionResponseDto;
import io.inji.verify.services.VPDefinitionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/vp-definition")
@RestController
@Slf4j
@CrossOrigin
public class VPDefinitionController {
    @Autowired
    VPDefinitionService vpDefinitionService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<VPDefinitionResponseDto> getPresentationDefinitionFor(@PathVariable String id) {

        VPDefinitionResponseDto vpDefinitionResponseDto = vpDefinitionService.getPresentationDefinition(id);
        if (vpDefinitionResponseDto != null)
        {
            return new ResponseEntity<>(vpDefinitionResponseDto, HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

    }
}
