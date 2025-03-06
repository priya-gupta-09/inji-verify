import React from "react";
import PageTemplate from "../components/PageTemplate";
import { Button } from "../components/Home/VerificationSection/commons/Button";
import { useTranslation } from "react-i18next";
import { useVerifyFlowSelector } from "../redux/features/verification/verification.selector";
import {
  getVpRequest,
  setBankingCredentials,
  setSelectedClaims,
} from "../redux/features/verify/vpVerificationState";
import { useAppDispatch } from "../redux/hooks";
import { BankingRedirection } from "../components/Home/VerificationSection/BankingRedirection";
import { VpSubmissionResultInt } from "../types/data-types";
import { getDetailsOrder } from "../utils/commonUtils";

export function BankingVerify() {
  const { t } = useTranslation("Verify");
  const txnId = useVerifyFlowSelector((state) => state.txnId);
  const dispatch = useAppDispatch();
  const unverifiedClaims = useVerifyFlowSelector(
    (state) => state.unVerifiedClaims
  );
  const isPartiallyShared = useVerifyFlowSelector(
    (state) => state.isPartiallyShared
  );
  const verifiedVcs: VpSubmissionResultInt[] = useVerifyFlowSelector(
    (state) => state.verificationSubmissionResult
  );

  const handleRequestCredentials = () => {
    console.log("in handleRequestCredentials");
    dispatch(setBankingCredentials());
    HandelGenerateQr();
  };

  const handleRedirectToBank = () => {
    console.log("verify vc");
    console.log(verifiedVcs);
    console.log(verifiedVcs[0].vc);
    const curVc = verifiedVcs[0].vc.credential;
    const orderedDetails = getDetailsOrder(curVc);
    console.log(orderedDetails);
    const userData = orderedDetails.reduce<Record<string, any>>((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    console.log("user data");
    console.log(userData);
    // const userData = {
    //   id: 123,
    //   name: "John Doe",
    //   role: "admin"
    // };

    const encryptData = (data: any) => btoa(JSON.stringify(data)); // Base64 Encoding
    const dt = encryptData(userData);
    // const encodedData = encodeURIComponent(JSON.stringify(userData));

    window.location.href = `http://localhost:3000/start-your-journey?status=success&&data=${dt}`;
  };

  const HandelGenerateQr = () => {
    console.log("in HandelGenerateQr");
    dispatch(setSelectedClaims({ selectedClaims: unverifiedClaims }));
    dispatch(getVpRequest({ selectedClaims: unverifiedClaims }));
  };

  const renderRequestCredentialsButton = () =>
    txnId === "" && (
      <Button
        id="request-credentials-button"
        title={t("generateQrCodeBtn")}
        className={`w-[300px] mx-auto`}
        fill
        onClick={handleRequestCredentials}
      />
    );

  const renderMissingAndResetButton = () => (
    <div className="flex items-center justify-around">
      <Button
        id="missing-credentials-button"
        title={t("missingCredentials")}
        className={`w-[300px]`}
        fill
        onClick={HandelGenerateQr}
      />
    </div>
  );

  const renderButton = () => {
    if (verifiedVcs.length !== 0) {
      return renderBackToBankingButton() || null;
    }

    return isPartiallyShared
      ? renderMissingAndResetButton()
      : renderRequestCredentialsButton();
  };

  const renderBackToBankingButton = () => {
    return (
      <Button
        id="request-credentials-button"
        title={"Continue with Composable Banking"}
        className={`w-[300px] mx-auto -m-20`}
        fill
        onClick={handleRedirectToBank}
      />
    );
  };

  return (
    <PageTemplate
      uploadDisabled={true}
      scanDisabled={true}
      vpVerifyDisabled={true}
      fromComposableBanking={true}
      bleDisabled={true}
    >
      <div className="flex flex-col w-full">
        <div className="col-start-1 col-end-13 lg:col-start-7 xs:w-[100vw] mb-20 lg:max-w-[100vw] p-0">
          <BankingRedirection />
        </div>
        <div className="xs:w-[100vw] lg:max-w-[100vw] lg:pb-[100px] -mt-20">
          {renderButton()}
        </div>
      </div>
    </PageTemplate>
  );
}

// lg:col-end-6 col-start-1 col-end-13

// ERROR
// Failed to fetch
// TypeError: Failed to fetch
//     at instantiateAsync (http://localhost:3002/zxing_reader_fd4d337baefdc655e351512754ad564729cc51d3.js:9:4479)
//     at createWasm (http://localhost:3002/zxing_reader_fd4d337baefdc655e351512754ad564729cc51d3.js:9:5551)
//     at http://localhost:3002/zxing_reader_fd4d337baefdc655e351512754ad564729cc51d3.js:9:56207
//     at http://localhost:3002/static/js/bundle.js:18310:28
//     at __webpack_require__.a (http://localhost:3002/static/js/bundle.js:251540:13)
//     at ./src/utils/qr-utils.js (http://localhost:3002/static/js/bundle.js:18293:21)
//     at options.factory (http://localhost:3002/static/js/bundle.js:252141:31)
//     at __webpack_require__ (http://localhost:3002/static/js/bundle.js:251471:32)
//     at fn (http://localhost:3002/static/js/bundle.js:251799:21)
//     at http://localhost:3002/static/js/bundle.js:11382:73

// qr expired request a new one -- no regenerating button showing
// request verifiable credentials btn not working
